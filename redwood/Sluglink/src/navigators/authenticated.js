import React from "react";

import {
    Text
} from 'react-native';

import {
    createNativeStackNavigator
} from "@react-navigation/native-stack";

import { FadeInTransition } from "./transitions";
import { BottomTabs } from './bottomtabs';
import { NewPostStack } from './newpost';
import { ViewProfileScreen } from '../screens';

import ProfileScreen from "../screens/authenticated/profile/ProfileScreen";
import { ViewEventScreen } from "../screens/authenticated/feed/viewevent";

import { Fonts, Colors } from '../styles';
import { BackButton } from '../screens/authenticated/profile/components'

const Stack = createNativeStackNavigator()

export const AuthenticatedStack = (props) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='Home'
        >
            <Stack.Screen
                name='Home'
                component={BottomTabs}
                options={{
                    ...FadeInTransition,
                }}
            />
            <Stack.Screen
                name='NewPost'
                component={NewPostStack}
                options={{
                    presentation: 'modal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='ViewProfile'
                component={ProfileScreen}
                options={{
                    presentation: 'modal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='ViewEvent'
                component={ViewEventScreen}
                options={({ navigation, route }) => ({
                    presentation: 'modal',
                    headerShown: true,
                    headerLeft: () => <BackButton onPress={navigation.goBack} icon='close' offset={false}/>,
                    title: '',
                    headerTransparent: true,
                })}

            />
        </Stack.Navigator>
    );
};
