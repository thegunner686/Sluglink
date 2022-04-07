import React from 'react';

import {
    Text
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    NewPostScreen,
    NewEventScreen,
    NewAnnouncementScreen,
    NewEventScreen2,
    NewEventScreen3,
    NewEventScreen4,
    EditPhysicalEventScreen,
    NewEventScreen5,
    NewEventScreen6,
    DetailedEvent
} from '../screens';
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
                name='NewEventScreen2'
                component={NewEventScreen2}
                options={({ navigation, route }) => ({
                    headerLeft: () => <BackButton goBack={navigation.goBack} />,
                    headerTitle: () => <Text style={Fonts.Paragraph3}>When does the event take place?</Text>,
                })}
            />
            <Stack.Screen
                name='NewEventScreen3'
                component={NewEventScreen3}
                options={({ navigation, route }) => ({
                    headerLeft: () => <BackButton goBack={navigation.goBack} />,
                    headerTitle: () => <Text style={Fonts.Paragraph3}>Virtual Setup</Text>,
                })}
            />
            <Stack.Screen
                name='NewEventScreen4'
                component={NewEventScreen4}
                options={({ navigation, route }) => ({
                    headerLeft: () => <BackButton goBack={navigation.goBack} />,
                    headerTitle: () => <Text style={Fonts.Paragraph3}>In-Person Setup</Text>,
                })}
            />
            <Stack.Screen
                name='NewEventScreen5'
                component={NewEventScreen5}
                options={({ navigation, route }) => ({
                    headerLeft: () => <BackButton goBack={navigation.goBack} />,
                    headerTitle: () => <Text style={Fonts.Paragraph3}>Event Media</Text>,
                })}
            />
            <Stack.Screen
                name='NewEventScreen6'
                component={NewEventScreen6}
                options={({ navigation, route }) => ({
                    headerLeft: () => <BackButton goBack={navigation.goBack} />,
                    headerTitle: () => <Text style={Fonts.Paragraph3}>Event Review</Text>,
                })}
            />
            <Stack.Screen
                name='EditPhysicalEventScreen'
                component={EditPhysicalEventScreen}
                options={({ navigation, route }) => ({
                    headerShown: false
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
