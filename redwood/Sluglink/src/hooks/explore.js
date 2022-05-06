import React, {
  useCallback,
  useEffect,
} from 'react';

import {
  usePagination
} from './pagination';
import PostEvents from '../emitters/postevents';

export const useExplorePosts = (category) => {
  const queries = [
    (ref) => ref.where('type', '==', 'Event'),
    // (ref) => ref.where('endDate', '>', Date.now()),
  ];
  if(category != null) {
    queries.push(
      (ref) => ref.where('category', '==', category)
    );
  }
  const [docs, fetching, refresh, fetchMore] = usePagination({
    collection: 'Posts',
    queries,
    limit: 5,
    orderBy: {
      name: 'datetime',
      order: 'asc'
    }
  });

  const fetch = useCallback(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    fetch();
  }, [category]);

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