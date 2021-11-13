// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const { firestore } = require('firebase-admin');

exports.follow = functions.https.onCall(async (data, context) => {
    const { followId } = data;
    const { uid } = context.auth;

    if(followId == null || uid == null) throw new functions.https.HttpsError('invalid-argument', 'Invalid users.');
    if(followId == uid) return true;

    const batch = firestore().batch();

    const timestamp = firestore.FieldValue.serverTimestamp();

    const toFollowRef = firestore().collection('Users').doc(followId).collection('Followers').doc(uid);

    batch.set(toFollowRef, {
        uid: uid,
        createdAt: timestamp
    });

    const userRef = firestore().collection('Users').doc(uid).collection('Following').doc(followId);

    batch.set(userRef, {
        uid: followId,
        createdAt: timestamp,
    });

    // Migrate the followId posts to this user
    const postsRef = firestore().collection('Users').doc(followId).collection('Posts');
    const feedRef = firestore().collection('Users').doc(uid).collection('Feed');
    try {
        const res = await firestore().runTransaction(async (transaction) => {
            return transaction.get(postsRef).then((documents) => {
                documents.forEach(async (doc) => {
                    transaction.set(feedRef.doc(doc.id), doc.data());
                });
            });
        });
    } catch(error) {
        console.error(error);
        throw new functions.https.HttpsError('internal', 'Failed to populate feed.');
    }

    try {
        await batch.commit();
    } catch(error) {
        console.error(error);
        throw new functions.https.HttpsError('internal', 'Failed to follow');
    }

    return true;
});

exports.unfollow = functions.https.onCall(async (data, context) => {
    const { unfollowId } = data;
    const { uid } = context.auth;

    if(unfollowId == uid) return true;

    const batch = firestore().batch();

    const toFollowRef = firestore().collection('Users').doc(unfollowId).collection('Followers').doc(uid);

    batch.delete(toFollowRef);

    const userRef = firestore().collection('Users').doc(uid).collection('Following').doc(unfollowId);

    batch.delete(userRef);

    // Remove the unfollowIds posts from this user
    const feedRef = firestore().collection('Users').doc(uid).collection('Feed');
    try {
        const res = await firestore().runTransaction(async (transaction) => {
            return transaction.get(feedRef.where('organizationId', '==', unfollowId))
                .then((documents) => {
                documents.forEach(async (doc) => {
                    await transaction.delete(feedRef.doc(doc.id));
                });
            });
        });
    } catch(error) {
        console.error(error);
        throw new functions.https.HttpsError('internal', 'Failed to depopulate feed.');
    }

    try {
        await batch.commit();
    } catch(error) {
        console.error(error);
        throw new functions.https.HttpsError('internal', 'Failed to follow');
    }

    try {
        await batch.commit();
    } catch(error) {
        console.error(error);
        throw new functions.https.HttpsError('internal', 'Failed to follow');
    }

    return true;
});
