import React, { useState, useEffect } from "react";
import firestore from '@react-native-firebase/firestore';

import { usePagination } from './pagination';

export const useProfile = (uid, state) => {

    const [ profile, setProfile ] = useState(null);

    useEffect(() => {
        if(!uid)
            return;
        firestore().collection('Users').doc(uid).get().then(snapshot => {
            setProfile(snapshot.data());
        });
    }, [...state]);

    return profile;
}

// might want to wrap in a useEffect at some point,
// fine for now
export const getProfilePosts = (uid) => {

    return usePagination({
        collection: 'Users',
        doc: uid,
        subCollection: 'Posts',
        limit: 3,
        orderBy: {
            name: 'datetime',
            order: 'desc'
        },
    });
}