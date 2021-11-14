import React, {
  useCallback,
  useEffect,
} from 'react';

import { usePagination } from './pagination';
import PostEvents from '../emitters/postevents';

export const useExplorePosts = (category) => {
  console.log(category)
  const [docs, fetching, refresh, fetchMore] = usePagination({
      collection: 'Posts',
      queries: category == null ? null : [
        (ref) => ref.where('category', '==', category),
      ],
      limit: 5,
      orderBy: {
          name: 'datetime',
          order: 'desc'
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
