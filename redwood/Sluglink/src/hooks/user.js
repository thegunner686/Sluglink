import create from "zustand";

import firestore from "@react-native-firebase/firestore";
import functions from "@react-native-firebase/functions";

export const useUser = (uid) => create((set, get) => ({
    user: null,
    listener: null,

    update: async (updates) => {
        return firestore().collection('Users').doc(uid).update(updates);
    },

    attachListener: () => {
        // remove the current user listener if one is already instantiated
        get().removeListener();

        // create the listener
        let listener = firestore().collection("Users").doc(uid).onSnapshot(snapshot => {
            set(state => ({
                user: snapshot.data()
            }));
        }, (error) => {
            console.log(error);
        });

        set(state => ({
            listener
        }));
    },

    removeListener: () => {
        if (get().listener) get().listener();
        set(state => ({
            listener: null
        }));
    },

    uploadProfilePicture: async (filename, uri) => {
        let ref = storage().ref(`Users/${uid}/${filename}`);

        await ref.putFile(uri);

        return ref.getDownloadURL();
    },

    deleteUser: () => {
        try {
            functions().httpsCallable('users-deleteUser')({});
            return 0;
        } catch (err) {
            console.error(err);
            return -1;
        }

    }

}));