import React from "react";

import {
    createNativeStackNavigator
} from "@react-navigation/native-stack";
import { StyleSheet } from 'react-native';
import { 
    Icon
} from 'react-native-elements';

import { BackButton } from "./components";
import { FadeInTransition } from "./transitions";
import { 
    OrganizationSignUpScreen, 
    OrganizationSignUpDetailsPrimaryScreen, 
    OrganizationSignUpDetailsSecondaryScreen,
    OrganizationSignUpDetailsTertiaryScreen,
    OrganizationCompleteSignUpScreen,
    OrganizationSignUpNextStepsScreen,
    OrganizationVerificationScreen,
    StudentVerificationScreen
} from '../screens';
import { Colors, Fonts } from "../styles";

const Stack = createNativeStackNavigator();

export const OrganizationSignUpStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="OrganizationSignUpScreen"
                component={OrganizationSignUpScreen}
                options={({ navigation, route }) => ({
                    ...FadeInTransition,
                    headerLeft: () => <BackButton name="close" goBack={navigation.goBack} />,
                    headerTitle: 'Sign Up',
                    headerTitleStyle: styles.titleStyle,
                    headerStyle: styles.header
                })}
            />
            <Stack.Screen
                name="OrganizationSignUpDetailsPrimary"
                component={OrganizationSignUpDetailsPrimaryScreen}
                options={({ navigation, route }) => ({
                    headerLeft: () => <BackButton goBack={navigation.goBack} />,
                    headerTitle: 'Details',
                    headerTitleStyle: styles.titleStyle,
                    headerStyle: styles.header
                })}
            />
            <Stack.Screen
                name="OrganizationSignUpDetailsSecondary"
                component={OrganizationSignUpDetailsSecondaryScreen}
                options={({ navigation, route }) => ({
                    headerLeft: () => <BackButton goBack={navigation.goBack} />,
                    headerTitle: 'Details',
                    headerTitleStyle: styles.titleStyle,
                    headerStyle: styles.header
                })}
            />
            <Stack.Screen
                name="OrganizationSignUpDetailsTertiary"
                component={OrganizationSignUpDetailsTertiaryScreen}
                options={({ navigation, route }) => ({
                    headerLeft: () => <BackButton goBack={navigation.goBack} />,
                    headerTitle: 'Point of Contact',
                    headerTitleStyle: styles.titleStyle,
                    headerStyle: styles.header
                })}
            />
            <Stack.Screen
                name="OrganizationCompleteSignUp"
                component={OrganizationCompleteSignUpScreen}
                options={({ navigation, route }) => ({
                    headerLeft: () => <BackButton goBack={navigation.goBack} />,
                    headerTitle: 'Complete Sign Up',
                    headerTitleStyle: styles.titleStyle,
                    headerStyle: styles.header
                })}
            />
            <Stack.Screen
                name="OrganizationVerification"
                component={OrganizationVerificationScreen}
                options={({ navigation, route }) => ({
                    headerLeft: null,
                    headerTitle: 'Verify Organization',
                    headerTitleStyle: styles.titleStyle,
                    headerStyle: styles.header
                })}
            />
            <Stack.Screen
                name="StudentVerification"
                component={StudentVerificationScreen}
                options={({ navigation, route }) => ({
                    headerLeft: null,
                    headerTitle: 'Verify Student',
                    headerTitleStyle: styles.titleStyle,
                    headerStyle: styles.header
                })}
            />
            <Stack.Screen
                name="OrganizationSignUpNextSteps"
                component={OrganizationSignUpNextStepsScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.White.rgb,
    },
    titleStyle: {
        ...Fonts.Paragraph4
    }
});
