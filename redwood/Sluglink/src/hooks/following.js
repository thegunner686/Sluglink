import React, {
    useCallback,
    useEffect,
    useState
} from 'react';

import { useAuth } from './auth';

import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';

export const useFollowing = (uid) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [user] = useAuth(state => [state.user]);

    useEffect(() => {
        if (user == null) return;
        return firestore().collection('Users').doc(user.uid)
            .collection('Following').doc(uid).onSnapshot((doc) => {
                if (doc != null && doc.exists) {
                    setIsFollowing(true);
                } else {
                    setIsFollowing(false);
                }
            });
    }, [user]);

    const follow = useCallback(async () => {
        if (uid == null) return;
        return functions().httpsCallable('users-follow')({ followId: uid });
    }, [uid]);

    const unfollow = useCallback(() => {
        if (uid == null) return;
        return functions().httpsCallable('users-unfollow')({ unfollowId: uid });
    }, [uid]);

    return [isFollowing, follow, unfollow];
};
