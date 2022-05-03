import React, { useEffect } from 'react';

import {
    Text,
    View,
    Image,
    Alert
} from 'react-native';
import {
    Button,
} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import { useProfile } from '../../../hooks';

import styles from './SettingsScreen.styles.js';

export default SettingsScreen = ({ navigation }) => {
    const [profile, update ] = useProfile();

    if(!profile)
        return (<View />);

    const signout = () => {
        auth().signOut().then(() => {
            navigation.navigate('Unauthenticated');
        })
    };

    const deleteAccount = () => {
        Alert.alert(
            'Are you sure you want to delete your account? ',
            'We\'ll miss you :(',
            [
                { text: 'Cancel', onPress: () => {} },
                { text: 'Yes, delete my account', style: "destructive", onPress: () => {} }
            ]
        );

    };

    return (
        <SafeAreaView 
            edges={['left', 'bottom', 'right']}
            style={styles.container}
        >
            <Button 
                title="Terms and Conditions"
                onPress={() => {}}
                containerStyle={styles.button.container}
            />
            <Button 
                title="Sign Out"
                onPress={signout}
                containerStyle={styles.button.container}
            />
            <Button
                title="Delete Account"
                onPress={deleteAccount}
                type="outline"
                buttonStyle={styles.button.button}
                containerStyle={styles.button.container}
                titleStyle={styles.button.title}
            />
        </SafeAreaView>
    );
};