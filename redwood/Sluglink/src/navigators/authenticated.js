import React from "react";

import {
    createStackNavigator
} from "@react-navigation/stack";

import { FadeInTransition } from "./transitions";
import { BottomTabs } from './bottomtabs';
import { NewPostStack } from './newpost';
import { ViewProfileScreen } from '../screens';

const Stack = createStackNavigator()

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
                component={ViewProfileScreen}
                options={{
                    presentation: 'modal',
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
};
