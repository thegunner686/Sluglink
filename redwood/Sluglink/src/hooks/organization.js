import React, {
    useState,
    useEffect
} from 'react';

import firestore from '@react-native-firebase/firestore';

import { usePagination } from './pagination';
import PostEvents from '../emitters/postevents';

export const useOrganization = (uid) => {
    const [organization, setOrganization] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const snapshot = await firestore().collection('Users').doc(uid).get();

            if(snapshot != null && snapshot.exists) {
                setOrganization(snapshot.data());
            } else {
                setOrganization(null);
            }
        };
        if(uid != null) fetch();
    }, [uid]);

    return [organization];
};

export const useOrganizationWithPosts = (uid) => {
    const [organization] = useOrganization(uid);
    const [docs, fetching, refresh, fetchMore] = usePagination(uid, {
        collection: 'Posts',
        limit: 3,
        orderBy: {
            name: 'datetime',
            order: 'desc'
        },
    });

    useEffect(() => {
        if(uid != null) refresh();
    }, [uid]);

    useEffect(() => {
        function fetch() {
            refresh();
        }
        PostEvents.on('post-create', fetch);
        return () => PostEvents.removeListener('post-create', fetch);
    }, []);

    useEffect(() => {
        function fetch() {
            refresh();
        }
        PostEvents.on('post-delete', fetch)
        return () => PostEvents.removeListener('post-delete', fetch);
    }, []);

    return [organization, docs, fetching, refresh, fetchMore];
}
