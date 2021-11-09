import React, { useCallback, useEffect, useState } from 'react';

import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {
    Button,
    Image
} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SettingsButton } from './components';
import { useProfile } from '../../../hooks';
import { useAuth } from '../../../hooks';
import { Colors, Fonts } from '../../../styles';

export const ProfileFollowingScreen = ({ navigation, route }) => {
    const [user, customClaims] = useAuth(state => [state.user, state.customClaims]);
    const [profile, listenToProfile, updateProfile] = useProfile(state => [state.profile, state.listen, state.update]);

    useEffect(() => {
        return listenToProfile(user.uid);
    }, []);

    return (
        <SafeAreaView 
            style={styles.container}
            edges={['left', 'bottom', 'right']}
        >

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White.rgb
    }
});
