// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const {
    firestore,
    database,
    auth
} = require('firebase-admin');

const stringHash = require('string-hash');

/**
 * Posts {
 *  /{id} {
 *      // Identification
 *      id, // uid
 *      type, // 'Event', 'Announcement'
 *      organizationId, // uid
 * 
 *      // Data
 *      createdAt, // server timestamp
 *      content,
 *      link,
 * 
 *      // event
 *      title,
 *      startTime,
 *      endDate,
 *      photos,
 *      category,
 *      location: {
 *          name,
 *          address,
 *          latitude,
 *          longitude,
 *          notes,
 *      },
 *      isVirtual,
 *      isPhysical,
 * 
 *      // Interaction
 *      views, // number
 *      favoritedBy: collection {
 *          /{id} {
 *              id,
 *              name,
 *          }
 *      }
 *  }
 * }
 * 
 * User {
 *  id,
 *  name,
 *  description,
 * 
 *  feed: Collection {
 *      /{id} {
 *          id,
 *          type,
 *          datetime,
 *          organizationId
 *      }
 *  }
 *  
 *  posts: Collection {
 *      /{id} {
 *          type: ENUM 'Announcement', 'Event',
 *          id,
 *          datetime, // for sorting, i.e. createdAt for announcements, startTime for Events
 *      }
 *  },
 * 
 *  favorites: Collection {
 *      /{id} {
 *          id,
 *          name,
 *      }
 *  },
 * 
 *  following: Collection {
 *      /{organizationId} {
 *          organizationName
 *          organizationId,
 *      }
 *  },
 * 
 * followers: Collection {
 *      /{uid} {
 *          uid,
 *      }
 *  }
 * }
 */

exports.report = functions.https.onCall(async (data, context) => {
    const {
        uid
    } = context.auth;

    if (!uid)
        throw new functions.https.HttpsError('permission-denied', "Insufficient permissions");

    let batch = firestore().batch();
    const reportRef = firestore().collection('Reports').doc();

    const now = firestore.FieldValue.serverTimestamp();
    batch.set(reportRef, {
        ...data,
        id: reportRef.id,
        reportTime: now
    });


    try {
        await batch.commit();
    } catch (e) {
        console.error(e);
        throw new functions.https.HttpsError('internal', 'Failed to post announcement');
    }

    return {
        id: reportRef.id,
    };
})


exports.create = functions.https.onCall(async (data, context) => {
    const {
        uid
    } = context.auth;

    let isOrganization;
    try {
        const record = await auth().getUser(uid);
        isOrganization = record.customClaims.organization;
    } catch (error) {
        console.error(error);
        throw new functions.https.HttpsError('permission-denied', 'Not authorized to post');
    }

    if (uid == null || !isOrganization) {
        throw new functions.https.HttpsError('permission-denied', 'Not authorized to post');
    }

    const batch = firestore().batch();

    const now = firestore.FieldValue.serverTimestamp();

    // Save in the global post store
    const postRef = firestore().collection('Posts').doc();

    const datetime = data.type === 'Event' ? data.startDate : now;
    const post = {
        ...data,
        id: postRef.id,
        organizationId: uid,
        createdAt: now,
        datetime,
        views: 0,
    };

    batch.set(postRef, post);

    /**
     * This is a condensed version of the post for the User's collection and Feeds,
     * it contains information needed to reference the main post (with all the details)
     * and other sorting related info (datetime, type)
     */
    const feedPost = {
        id: postRef.id,
        organizationId: uid,
        type: data.type,
        datetime
    };

    // Save as a user's post
    const userPostsRef = firestore().collection('Users').doc(uid)
        .collection('Posts').doc(postRef.id);

    batch.set(userPostsRef, feedPost);

    // Post to this user's feed

    const userFeedRef = firestore().collection('Users').doc(uid)
        .collection('Feed').doc(postRef.id);

    batch.set(userFeedRef, feedPost);

    // Post to followers feed

    try {
        const snapshots = await firestore().collection('Users').doc(uid).collection('Followers').get();
        snapshots.forEach((doc) => {
            const followerRef = firestore().collection('Users').doc(doc.data().uid)
                .collection('Feed').doc(postRef.id);

            batch.set(followerRef, feedPost);
        });
    } catch (error) {
        console.log(error);
        throw new functions.https.HttpsError('internal', 'Failed to fetch and post to followers');
    }

    try {
        await batch.commit();
    } catch (e) {
        console.error(e);
        throw new functions.https.HttpsError('internal', 'Failed to post announcement');
    }

    return {
        id: postRef.id,
    };
});

exports.updateAnnouncement = functions.https.onCall(async (data, context) => {

});

exports.delete = functions.https.onCall(async (data, context) => {
    const {
        uid
    } = context.auth;

    let isOrganization;
    try {
        const record = await auth().getUser(uid);
        isOrganization = record.customClaims.organization;
    } catch (error) {
        console.error(error);
        throw new functions.https.HttpsError('permission-denied', 'Not authorized to delete post');
    }

    if (uid == null || !isOrganization) {
        throw new functions.https.HttpsError('permission-denied', 'Not authorized to delete post');
    }

    const {
        id
    } = data;

    const batch = firestore().batch();

    // Delete from the global post store
    const postRef = firestore().collection('Posts').doc(id);

    batch.delete(postRef);

    // Delete user's post
    const userPostsRef = firestore().collection('Users').doc(uid)
        .collection('Posts').doc(id);

    batch.delete(userPostsRef);

    // Post to this user's feed

    const userFeedRef = firestore().collection('Users').doc(uid)
        .collection('Feed').doc(id);

    batch.delete(userFeedRef);

    // Post to followers feed

    try {
        const snapshots = await firestore().collection('Users').doc(uid).collection('Followers').get();
        snapshots.forEach((doc) => {
            const followerRef = firestore().collection('Users').doc(doc.data().uid)
                .collection('Feed').doc(id);

            batch.delete(followerRef);
        });
    } catch (error) {
        console.log(error);
        throw new functions.https.HttpsError('internal', 'Failed to fetch and post to followers');
    }

    try {
        await batch.commit();
    } catch (e) {
        console.error(e);
        throw new functions.https.HttpsError('internal', 'Failed to post announcement');
    }

    return true;
});