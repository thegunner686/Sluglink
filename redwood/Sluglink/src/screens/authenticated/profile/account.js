import React, { useCallback, useEffect, useState } from 'react';

import {
    Text
} from 'react-native';
import {
    Button
} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

import { SettingsButton } from './components';

export const AccountScreen = ({ navigation, route }) => {

    const toggleDrawer = useCallback(() => {
        navigation.toggleDrawer();
    }, [navigation]);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => null,
            headerRight: () => <SettingsButton onPress={toggleDrawer}/>
        });
    }, []);

    const signOut = async () => {
        try {
            await auth().signOut();
            navigation.navigate('Unauthenticated');
        } catch(e) {
            console.log(e);
        }
    };

    return (
        <SafeAreaView edges={['left', 'bottom', 'right']}>
            <Text>Account</Text>
            <Button 
                title='Sign Out'
                type='outline'
                onPress={signOut}
            />
        </SafeAreaView>
    );
};