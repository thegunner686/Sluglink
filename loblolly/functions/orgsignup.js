// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const {
    firestore,
    database
} = require('firebase-admin');

const stringHash = require('string-hash');
const {
    v4: uuidv4
} = require('uuid');
var base32 = require('base32.js');
const totp = require('totp-generator');
const nodemailer = require('nodemailer');
const ses = require('nodemailer-ses-transport');

var transporter = nodemailer.createTransport(ses({
    accessKeyId: functions.config().aws_ses.access_key_id,
    secretAccessKey: functions.config().aws_ses.secret_access_key,
    region: functions.config().aws_ses.region,
}));

const verifyOrganizationEmail = (email) => {
    const regex = /(@ucsc\.edu)|(@gmail\.com)/g;
    return email.match(regex) != null;
};

const verifyStudentEmail = (email) => {
    const regex = /@ucsc\.edu/g;
    return email.match(regex);
};

const INTERNAL_ERROR_MSG = 'An error occurred on our end.';

/**
 * Creates a record of the new organization sign up in /OrganizationSignUp/{uid}
 */
exports.newRegistration = functions.https.onCall(async (data, context) => {
    const {
        email,
        contact
    } = data;

    if (!verifyOrganizationEmail(email)) {
        const msg = `${email} is not a valid organization email.`;
        throw new functions.https.HttpsError('invalid-argument', msg)
    }

    if (!verifyStudentEmail(contact.email)) {
        const msg = `${contact.email} is not a valid student email.`;
        throw new functions.https.HttpsError('invalid-argument', msg);
    }

    const hash = stringHash(email);

    console.log(`${email} hashes to ${hash}`);

    let org;
    try {
        org = (await database().ref(`Organizations/${hash}`).get()).val();
    } catch (e) {
        console.error(e);
        throw new functions.https.HttpsError('internal', INTERNAL_ERROR_MSG);
    }

    if (org != null) {
        const msg = `There is already an organization registered with ${email}.`;
        throw new functions.https.HttpsError('already-exists', msg);
    }

    try {
        await database().ref(`Organizations/${hash}`).set(email);
    } catch (e) {
        console.error(e);
        throw new functions.https.HttpsError('internal', INTERNAL_ERROR_MSG);
    }

    try {
        firestore().collection('OrganizationSignUp').doc(hash.toString()).set({
            createdAt: firestore.FieldValue.serverTimestamp(),
            organizationVerified: false,
            studentVerified: false,
            verified: false,
            ...data
        });
    } catch (e) {
        console.error(e);
        throw new functions.https.HttpsError('internal', INTERNAL_ERROR_MSG);
    }

    return {
        status: 'OK'
    };
});

const createParams = (email, subject, body) => {
    return {
        Destination: {
            /* required */
            CcAddresses: [],
            ToAddresses: [email]
        },
        Message: {
            /* required */
            Body: {
                /* required */
                Html: {
                    Charset: "UTF-8",
                    Data: body,
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "TEXT_FORMAT_BODY"
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject,
            }
        },
        Source: 'sluglink@ucsc.edu',
        /* required */
        ReplyToAddresses: [
            'sluglink@ucsc.edu',
            /* more items */
        ],
    };
}

const sendEmail = async (email, subject, body) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
                from: 'sluglink@ucsc.edu',
                to: email,
                subject,
                html: body,
            },
            function (err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(data);
            });
    })
}

const refreshVerificationTokens = async (organization, student) => {
    const encoder = new base32.Encoder();
    let organizationEmailCode = totp(encoder.write((`${stringHash(organization.email)}-${uuidv4()}`)).finalize());
    let studentEmailCode = totp(encoder.write((`${stringHash(student.email)}-${uuidv4()}`)).finalize());

    const hash = stringHash(organization.email);

    try {

        await database().ref(`Verifications/${hash}`).set({
            organization: organizationEmailCode,
            student: studentEmailCode,
        });

        await sendEmail(organization.email, 'Sluglink - Verify your Organization',
            `
            <p>Your Sluglink organization verification code for ${organization.name}</p>
            <h3>${organizationEmailCode}</h3>
            </br>
        `
        );

        await sendEmail(student.email, 'Sluglink - Verify your Student Contact',
            `
            <p>Your Sluglink student verification code for ${student.name}</p>
            <h3>${studentEmailCode}</h3>
            </br>
        `
        );

    } catch (e) {
        console.error(e);
    }
};

exports.refreshVerificationTokensOnRegistration = functions.firestore
    .document('OrganizationSignUp/{id}')
    .onCreate(async (snap, context) => {
        const {
            email,
            name,
            contact
        } = snap.data();

        return refreshVerificationTokens({
            email,
            name
        }, {
            email: contact.email,
            name: contact.name
        });
    });

exports.verifyCode = functions.https.onCall(async (data, context) => {
    const {
        email,
        type,
        code
    } = data;

    const hash = stringHash(email);

    switch (type) {
        case 'Organization':

            const organizationVerificationCode = (await database().ref(`Verifications/${hash}/organization`).get()).val();

            if (organizationVerificationCode === code) {
                firestore().collection('OrganizationSignUp').doc(hash.toString()).update({
                    organizationVerified: true
                });
                return {
                    status: 'OK',
                    verified: true
                };
            } else {
                return {
                    status: 'OK',
                    verified: false
                };
            }

            break;
        case 'Student':

            const studentVerificationCode = (await database().ref(`Verifications/${hash}/student`).get()).val();

            if (studentVerificationCode === code) {
                firestore().collection('OrganizationSignUp').doc(hash.toString()).update({
                    studentVerified: true,
                });
                return {
                    status: 'OK',
                    verified: true
                };
            } else {
                return {
                    status: 'OK',
                    verified: false
                };
            }

            break;
        default:
            throw new functions.https.HttpsError('invalid-argument', 'Invalid verification type.');
            break;
    }
});

// enum status { 'UNREGISTERED' 'REGISTERED', 'VERIFIED' }
exports.getStatus = functions.https.onCall(async (data, context) => {
    console.log("call");
    const {
        email
    } = data;

    if (!verifyOrganizationEmail(email)) {
        const msg = `${email} is not a valid organization email.`;
        throw new functions.https.HttpsError('invalid-argument', msg)
    }

    const hash = stringHash(email);

    let org;
    try {
        org = (await database().ref(`Organizations/${hash}`).get()).val();
    } catch (e) {
        console.error(e);
        throw new functions.https.HttpsError('internal', INTERNAL_ERROR_MSG);
    }

    if (org == null) {
        return {
            status: 'UNREGISTERED'
        };
    }

    let doc;
    try {
        doc = await firestore().collection('OrganizationSignUp').doc(hash.toString()).get();
    } catch (e) {
        console.error(e);
        throw new functions.https.HttpsError('internal', INTERNAL_ERROR_MSG);
    }

    if (!doc.exists) {
        throw new functions.https.HttpsError('not-found', 'Organization sign up status couldn\'t be fetched.');
    }

    const orgsignup = doc.data();

    if (!orgsignup.organizationVerified || !orgsignup.studentVerified) {
        await refreshVerificationTokens({
            email: orgsignup.email,
            name: orgsignup.name
        }, {
            email: orgsignup.contact.email,
            name: orgsignup.contact.name
        });
    }

    return {
        status: orgsignup.verified ? 'VERIFIED' : 'REGISTERED',
        organization: {
            email: orgsignup.email,
            name: orgsignup.name,
            verified: orgsignup.organizationVerified
        },
        student: {
            email: orgsignup.contact.email,
            name: orgsignup.contact.name,
            verified: orgsignup.studentVerified
        },
    };
});