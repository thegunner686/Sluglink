import React, {
    useState,
    useEffect,
    useCallback
} from 'react';

import firestore from '@react-native-firebase/firestore';

import { useAuth } from './auth';
import { usePagination } from './pagination';

export const useProfile = () => {
    const [user] = useAuth(state => [state.user]);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user == null) return;

        return firestore().collection('Users').doc(user.uid).onSnapshot((doc) => {
            if (doc != null && doc.exists) {
                setProfile(doc.data());
            } else {
                setProfile(null);
            }
        });
    }, [user]);

    const update = useCallback((updates) => {
        if (user == null) return;
        firestore().collection('Users').doc(user.uid).update(updates);
    }, [user]);

    return [profile, update];
};

export const useProfileWithPosts = () => {
    const [profile, update] = useProfile();
    const [posts, fetching, refresh, fetchMore] = usePagination({
        collection: 'Users',
        doc: profile?.uid,
        subCollection: 'Posts',
        limit: 3,
        orderBy: {
            name: 'datetime',
            order: 'desc'
        }
    });

    useEffect(() => {
        if (profile?.uid) refresh();
    }, [profile]);

    return [profile, update, posts, fetching, refresh, fetchMore];
}
