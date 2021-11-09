import React from "react";

import {
    createStackNavigator
} from "@react-navigation/stack";

import { FadeInTransition } from "./transitions";
import { SignInScreen } from '../screens';
import { OrganizationSignUpStack } from "./orgsignup";

const Stack = createStackNavigator();

export const UnauthenticatedStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                presentation: "modal"
            }}
        >
            <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                    ...FadeInTransition
                }}
            />
            <Stack.Screen
                name="OrganizationSignUp"
                component={OrganizationSignUpStack}
            />
        </Stack.Navigator>
    );
};
