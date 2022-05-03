// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');

var serviceAccount = require("./keys.json");

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sluglink-e60af-default-rtdb.firebaseio.com"
  });
}

const { firestore, database, auth } = require('firebase-admin');

const stringHash = require('string-hash');

const verifyEmail = (email) => {
    const regex = /(@ucsc\.edu)|(@gmail\.com)/g;
    return email != null && email.match(regex) != null;
};

const isGmail = (email) => {
    const regex = /@gmail\.com/g;
    return email != null && email.match(regex) != null;
}

/**
 * Check if this is a valid email, if not, delete the user
 * Check if it is an organization, if not, and not @ucsc, delete the user
 * Set custom claims, organization & ucsc affiliation
 * Setup a document in firestore under the User collection
 */
exports.userCreation = functions.auth.user().onCreate(async (user) => {
    const { email, uid } = user;
    if(!verifyEmail(email)) {
        try {
            await auth().deleteUser(uid);
        } catch (e) {
            console.error(e);
        }
        console.log(`Deleting user ${uid}, for invalid email: ${email}`);
        return false;
    }

    // Is the user an organization?
    let isOrganization = false;
    const isUCSC = !isGmail(email);

    const hash = stringHash(email);
    let org;
    try {
        org = (await database().ref(`Organizations/${hash}`).get()).val();
    } catch(e) {
        console.error(e);
    }

    let orgdata;
    if(org == null) {
        if(!isUCSC) {
            try {
                await auth().deleteUser(uid);
            } catch (e) {
                console.log(e);
            }
            console.log(`Deleting user ${uid}, uses @gmail.com but no organization found.`);
            return false;
        }
    } else {
        const doc = await firestore().collection('OrganizationSignUp').doc(hash.toString()).get();
        orgdata = doc.data();
        const { verified, organizationVerified, studentVerified } = orgdata;
        if(doc.exists && verified && organizationVerified && studentVerified) {
            isOrganization = true;
        } else {
            try {
                await auth().deleteUser(uid);
            } catch (e) {
                console.log(e);
            }
            console.log(`Deleting user ${uid}, unverified organization attempting sign in.`);
            return false;
        }
    }

    // Set custom claims
    await auth().setCustomUserClaims(uid, {
        organization: isOrganization, // is it a verified organization?
        ucsc: isUCSC, // is it a ucsc affiliated account?
    });

    
    return firestore().collection('Users').doc(uid).set({
        uid,
        email,
        email_verified: user.emailVerified || false,
        phone_number: user.phoneNumber || null,
        createdAt: firestore.FieldValue.serverTimestamp(),
        lastLogin: firestore.FieldValue.serverTimestamp(),
        organization: isOrganization,
        ucsc: isUCSC,
        name: user.displayName,
        picture: user.photoURL,
        description: '',
        ...orgdata,
    });
});

/**
 * Check if the user is disabled or deleted, throw an error if so
 * Check if the user has a valid email, throw and error if not
 * Also verify that the gmail account is a valid organization
 * Update the firebase user object with new sign in info
 */
exports.userSignIn = functions.https.onCall(async (data, context) => {
    const uid = context.auth.uid;
    const email = context.auth.token.email || null;

    try {
        const user = await auth().getUser(uid);
        if(user.disabled) {
            throw '';
        }
    } catch(e) {
        console.error(e);
        throw new functions.https.HttpsError('unauthenticated', 'User doesn\'t exist or is disabled.');
    }

    if(!verifyEmail(email)) {
        try {
            await auth().deleteUser(uid);
        } catch(e) {
            console.error(e);
        }
        throw new functions.https.HttpsError('permission-denied', 'Invalid email');
    } else {
        if(isGmail(email)) {
            const hash = stringHash(email);
            const doc = await firestore().collection('OrganizationSignUp').doc(hash.toString()).get();
            const { verified, organizationVerified, studentVerified } = doc.data();
            if(!doc.exists || !verified || !organizationVerified || !studentVerified) {
                try {
                    await auth().deleteUser(uid);
                } catch (e) {
                    console.log(e);
                }
                console.log(`Deleting user ${uid}, unverified organization attempting sign in.`);
                throw new functions.https.HttpsError('permission-denied', 'Unverified organization attempting to sign in.');
            }
        }
    }

    // At this point, the user is valid and is performing a legal sign in
    
    const isNewUser = !(await firestore().collection('Users').doc(uid).get()).exists;

    if(!isNewUser) {
        try {
            await firestore().collection('Users').doc(uid).update({
                lastLogin: firestore.FieldValue.serverTimestamp(),
                email_verified: context.auth.token.email_verified,
            });
        } catch(e) {
            console.error(e);
            throw new functions.https.HttpsError('internal', 'An error occurred while updating the user on sign in.');
        }
    }

    return { status: 'OK', isNewUser }

});
