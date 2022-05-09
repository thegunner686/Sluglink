import React, {
    useState,
    useEffect,
    useCallback
} from 'react';

import firestore from '@react-native-firebase/firestore';

import {
    usePagination
} from './pagination';
import PostEvents from '../emitters/postevents';

export const useOrganization = (uid) => {
    const [organization, setOrganization] = useState(null);

    useEffect(() => {
        const unsub = firestore().collection('Users').doc(uid).onSnapshot({
            next: async (doc) => {
                let org = doc.data();
                setOrganization(org);
            }
        })
        return () => unsub();
    }, [uid]);

    return [organization];
};

export const useOrganizationWithPosts = (uid) => {
    const [organization] = useOrganization(uid);
    const [docs, fetching, refresh, fetchMore] = usePagination({
        collection: 'Users',
        doc: uid,
        subCollection: 'Posts',
        limit: 3,
        orderBy: {
            name: 'datetime',
            order: 'desc'
        },
    });

    const fetch = useCallback(() => {
        refresh();
    }, [refresh]);

    useEffect(() => {
        if (uid != null) refresh();
    }, [uid]);

    useEffect(() => {
        PostEvents.on('post-create', fetch);
        return () => PostEvents.removeListener('post-create', fetch);
    }, []);

    useEffect(() => {
        PostEvents.on('post-delete', fetch)
        return () => PostEvents.removeListener('post-delete', fetch);
    }, []);

    useEffect(() => {
        PostEvents.on('post-report', fetch)
        return () => PostEvents.removeListener('post-report', fetch);
    }, []);

    return [organization, docs, fetching, refresh, fetchMore];
}