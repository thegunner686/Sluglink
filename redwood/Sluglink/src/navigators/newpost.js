import React from 'react';

import {
    Text
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NewPostScreen, NewEventScreen, NewAnnouncementScreen } from '../screens';
import { Fonts } from '../styles';
import { BackButton } from '.';

const Stack = createNativeStackNavigator();

export const NewPostStack = () => {
    return (
        <Stack.Navigator
        >
            <Stack.Screen
                name='NewPostScreen'
                component={NewPostScreen}
                options={({ navigation, route }) => ({
                    headerLeft: () => <BackButton goBack={navigation.goBack} name='close' />,
                    headerTitle: () => <Text style={Fonts.Paragraph3}>New Post</Text>,
                })}
            />
            <Stack.Screen
                name='NewEventScreen'
                component={NewEventScreen}
                options={({ navigation, route }) => ({
                    headerLeft: () => <BackButton goBack={navigation.goBack} />,
                    headerTitle: () => <Text style={Fonts.Paragraph3}>Create Event</Text>,
                })}
            />
            <Stack.Screen
                name='NewAnnouncementScreen'
                component={NewAnnouncementScreen}
                options={({ navigation, route }) => ({
                    headerLeft: () => <BackButton goBack={navigation.goBack} />,
                    headerTitle: () => <Text style={Fonts.Paragraph3}>Create Announcement</Text>,
                })}
            />
        </Stack.Navigator>
    );
};
