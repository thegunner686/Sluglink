import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';

import { useAuth } from './auth';
import { usePagination } from './pagination';
import PostEvents from '../emitters/postevents';

export const useFeed = (limit) => {
    const [user] = useAuth(state => [state.user]);
    const [docs, fetching, refresh, fetchMore] = usePagination(user?.uid, {
        collection: 'Feed',
        limit,
        orderBy: {
            name: 'datetime',
            order: 'desc'
        }
    });

    const fetch = useCallback(() => {
        refresh();
    }, [refresh]);

    useEffect(() => {
        if(user?.uid != null) fetch();
    }, [user]);

    useEffect(() => {
        PostEvents.on('post-create', fetch);
        return () => PostEvents.removeListener('post-create', fetch);
    }, []);

    useEffect(() => {
        PostEvents.on('post-delete', fetch);
        return () => PostEvents.removeListener('post-delete', fetch);
    }, []);

    return [docs, fetching, refresh, fetchMore];
};
