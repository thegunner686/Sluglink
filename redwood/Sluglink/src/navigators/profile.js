import React from 'react';

import {
    Text
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProfileScreen } from '../screens';
import { Fonts, Colors } from '../styles';
import { ProfileFollowingScreen, EditProfileScreen } from '../screens';
import { BackButton } from './components';
import { ViewProfileScreen } from '../screens';


const Stack = createNativeStackNavigator();

export const ProfileStack = () => {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                
                headerBackTitleVisible: false
            })}
        >
            <Stack.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                options={{
                    headerTitle: () => <Text style={Fonts.Paragraph3}>Profile</Text>,
                }}
            />
            <Stack.Screen
                name='ProfileFollowingScreen'
                component={ProfileFollowingScreen}
            />
            <Stack.Screen
                name='EditProfileScreen'
                component={EditProfileScreen}
                options={({ navigation }) => ({
                    headerLeft: () => <BackButton goBack={navigation.goBack} />,
                    headerTitle: () => <Text style={Fonts.Paragraph3}>Edit Profile</Text>
                })}
            />
        </Stack.Navigator>
    )
}