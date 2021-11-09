import React, {
    useCallback,
    useState,
} from 'react';

import firestore from '@react-native-firebase/firestore';

/**
 * Options {
 *  collection: string, // name of the collection to watch
 *  limit: number, // number of docs to limit each fetch
 *  orderBy: {
 *      name: string, // name of the property to order by
 *      order: 'asc' | 'desc'
 *  },
 * }
 */

export const usePagination = (uid, options={ collection: 'Feed', limit: 10 }) => {
    const [docs, setDocs] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [lastDoc, setLastDoc] = useState(null);

    const orderByTransform = (ref, options) => {
        if(options.orderBy && options.orderBy.name && options.orderBy.order) {
            ref = ref.orderBy(options.orderBy.name, options.orderBy.order);
        } else {
            ref = ref.orderBy('datetime', 'desc');
        }
        return ref;
    };

    const refresh = useCallback(async () => {
        if(uid == null || fetching) return;
        // setFetching(true);
        let ref = firestore().collection('Users').doc(uid).collection(options.collection);
        ref = orderByTransform(ref, options);
        ref = ref.limit(options.limit);

        const snapshot = await ref.get();

        if(snapshot.docs == null || snapshot.docs.length == 0) {
            setDocs([]);
            // setFetching(false);
            return;
        }

        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

        let newDocs = [];

        snapshot.docs.forEach((doc) => {
            newDocs.push(doc.data());
        });

        setDocs([...new Map([...newDocs].map(item => (
                [item.id, item]
        ))).values()].sort((p1, p2) => {
            return p1.datetime.toDate() < p2.datetime.toDate()
        }));

        // setFetching(false);
    }, [docs, lastDoc, fetching, uid, options, setDocs, setLastDoc]);

    const fetchMore = useCallback(async () => {
        if(uid == null || fetching) return;
        // setFetching(true);
        let ref = firestore().collection('Users').doc(uid).collection(options.collection);
        ref = orderByTransform(ref, options);
        ref = ref.limit(options.limit);
        ref = ref.startAfter(lastDoc);

        const snapshot = await ref.get();

        if(snapshot.docs == null || snapshot.docs.length == 0) {
            // setFetching(false);
            return;
        }

        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

        let newDocs = [];

        snapshot.docs.forEach((doc) => {
            newDocs.push(doc.data());
        });

        setDocs(oldDocs => {
            return [...new Map([...oldDocs, ...newDocs].map(item => (
                    [item.id, item]
            ))).values()].sort((p1, p2) => {
                return p1.datetime.toDate() < p2.datetime.toDate()
            });
        });

        // setFetching(false);
    }, [docs, lastDoc, fetching, uid, options, setDocs, setLastDoc]);

    return [docs, fetching, refresh, fetchMore];
};
