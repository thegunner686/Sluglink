import React from "react";

import {
    createNativeStackNavigator
} from "@react-navigation/native-stack";

import { FadeInTransition } from "./transitions";
import { BottomTabs } from './bottomtabs';
import { NewPostStack } from './newpost';
import { ViewProfileScreen } from '../screens';
import ProfileScreen from "../screens/authenticated/profile/ProfileScreen";

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
        </Stack.Navigator>
    );
};
