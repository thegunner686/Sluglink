import create from "zustand";

import auth from "@react-native-firebase/auth";
import functions from '@react-native-firebase/functions';

import {
    GOOGLE_SIGN_IN_WEB_CLIENT_ID
} from "@env";

import {
    GoogleSignin
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: GOOGLE_SIGN_IN_WEB_CLIENT_ID,
});

export const useAuth = create((set, get) => ({
    user: null,
    isNewUser: false,
    isSignedIn: () => auth().currentUser != null,

    customClaims: null,
    getCustomClaims: async () => {
        await auth().currentUser.getIdToken(true);
        return auth().currentUser.getIdTokenResult();
    },

    registered: false,
    onAuthStateChanged: () => {
        return auth().onAuthStateChanged(user => {
            /**
             * This looks weird but we need it to avoid some
             * strange auth state behavior
             */
            if (!get().registered && user == null) {
                set(state => ({
                    registered: true
                }));
                return;
            }
            if (user) {
                functions().httpsCallable('auth-userSignIn')().then(async ({
                    data
                }) => {
                    const {
                        isNewUser
                    } = data;
                    await auth().currentUser.getIdToken(true);
                    const res = await auth().currentUser.getIdTokenResult();
                    set(state => ({
                        user,
                        isNewUser,
                        customClaims: res.claims
                    }));
                }).catch(async (error) => {
                    try {
                        await auth().signOut();
                    } catch (e) {
                        console.log(e);
                    }
                    set(state => ({
                        user: null,
                        isNewUser: false,
                        customClaims: null
                    }));
                });
            } else {
                set(state => ({
                    user: null,
                    isNewUser: false,
                    customClaims: null
                }));
            }
        });
    },

    signIn: async () => {
        if (get().isSignedIn()) {
            await auth().currentUser.getIdToken(true);
            return;
        }
        try {
            // Get the users ID token
            const {
                idToken
            } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);
            console.log("auth");
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    signOut: async () => {
        try {
            await auth().signOut();
            return true;
        } catch (e) {
            return false;
        }
    },
}));