import create from "zustand";

import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import PostEvents from "../emitters/postevents";

export const usePosts = create((set, get) => ({
    createPost: async (data) => {
        // creation stuff
        try {
            const res = await functions().httpsCallable('post-create')(data);
            PostEvents.emit('post-create');
        } catch (error) {
            console.error(error);
        }
    },

    deletePost: async (data) => {
        try {
            const res = await functions().httpsCallable('post-delete')(data);
            PostEvents.emit('post-delete');
        } catch (error) {
            console.error(error);
        }
    },

    getPost: async (id) => {
        const snapshot = await firestore().collection('Posts').doc(id).get();
        if (snapshot.exists) {
            return snapshot.data();
        } else {
            throw `Post with ID ${id} doesn't exist`;
        }
    },

}));