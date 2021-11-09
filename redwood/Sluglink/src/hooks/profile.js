import React, {
    useState,
    useEffect,
    useCallback
} from 'react';

import firestore from '@react-native-firebase/firestore';

import { useAuth } from './auth';

export const useProfile = () => {
    const [user] = useAuth(state => [state.user]);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if(user == null);
        
        return firestore().collection('Users').doc(user.uid).onSnapshot((doc) => {
            if(doc != null && doc.exists) {
                setProfile(doc.data());
            } else {
                setProfile(null);
            }
        });
    }, [user]);

    const update = useCallback((updates) => {
        if(user == null) return;
        firestore().collection('Users').doc(user.uid).update(updates);
    }, [user]);

    return [profile, update];
};
