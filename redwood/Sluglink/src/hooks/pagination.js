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
/**
 * Follow the [rules of queries](https://firebase.google.com/docs/firestore/query-data/queries)
 */
export const usePagination = ({
    collection,
    doc,
    subCollection,
    subDoc,
    limit,
    orderBy,
    queries
}) => {
    const [docs, setDocs] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [lastDoc, setLastDoc] = useState(null);

    const orderByTransform = (ref) => {
        if (orderBy && orderBy.name && orderBy.order) {
            ref = ref.orderBy(orderBy.name, orderBy.order);
        } else {
            ref = ref.orderBy('datetime', 'desc');
        }
        return ref;
    };

    const refresh = useCallback(async () => {
        if (fetching) return;
        setFetching(true);
        let ref = firestore().collection(collection);
        if (doc) {
            ref = ref.doc(doc);
            if (subCollection) {
                ref = ref.collection(subCollection);
            }
        }

        if (queries && queries.length > 0) {
            for (const query of queries) {
                ref = query(ref);
            }
        }
        ref = orderByTransform(ref);
        ref = ref.limit(limit);

        const snapshot = await ref.get();

        if (snapshot.docs == null || snapshot.docs.length == 0) {
            setDocs([]);
            setFetching(false);
            return;
        }

        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

        let newDocs = [];

        snapshot.docs.forEach((doc) => {
            newDocs.push(doc.data());
        });

        setDocs([...new Map([...newDocs].map(item => (
            [item.id, item]
        ))).values()]);

        // no need to sort
        // .sort((p1, p2) => {
        //     return p1.datetime > p2.datetime
        // })

        setFetching(false);
    }, [docs, lastDoc, fetching, queries, setDocs, setLastDoc]);

    const fetchMore = useCallback(async () => {
        if (fetching) return;
        setFetching(true);
        let ref = firestore().collection(collection);
        if (doc) {
            ref = ref.doc(doc);
            if (subCollection) {
                ref = ref.collection(subCollection);
            }
        }
        if (queries && queries.length > 0) {
            for (const query of queries) {
                ref = query(ref);
            }
        }
        ref = orderByTransform(ref);
        ref = ref.limit(limit);
        ref = ref.startAfter(lastDoc);

        const snapshot = await ref.get();

        if (snapshot.docs == null || snapshot.docs.length == 0) {
            setFetching(false);
            return;
        }

        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

        let newDocs = [];

        snapshot.docs.forEach((doc) => {
            newDocs.push(doc.data());
        });

        console.log();
        setDocs(oldDocs => {
            return [...new Map([...oldDocs, ...newDocs].map(item => (
                [item.id, item]
            ))).values()]
        });

        // no need to sort
        // .sort((p1, p2) => {
        //     return p1.datetime > p2.datetime
        // });

        setFetching(false);
    }, [docs, lastDoc, fetching, queries, setDocs, setLastDoc]);

    return [docs, fetching, refresh, fetchMore];
};
