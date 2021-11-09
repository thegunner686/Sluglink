import React, { useState, useCallback, useEffect, useRef } from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {
    Icon,
    Button
} from 'react-native-elements';
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Fonts, width, height, sizes } from "../../../styles";
import { useSignUp } from './signupstore';

export const OrganizationSignUpNextStepsScreen = ({ route, navigation }) => {
    const [organization] = useSignUp(state => [state.organization]);

    const goToSignIn = useCallback(() => {
        navigation.navigate("SignIn");
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <Icon
                name='done-all'
                size={200}
                color={Colors.Brown1.rgb}
            />
            <View style={styles.textContainer}>
                <Text style={[Fonts.SubHeader3, { textAlign: 'center', marginVertical: 10 }]}>Thank you for signing up with Slugline!</Text>
                <Text style={[Fonts.Paragraph4, { textAlign: 'center', marginVertical: 10 }]}>We are going to review your organization and send you an email to notify you once you've been verified. From there, you'll be able to sign in with {organization.email} and connect with your audience!</Text>
            </View> 
            <Button
                title='Close'
                onPress={goToSignIn}
                containerStyle={{ marginVertical: 40 }}
                buttonStyle={styles.button}
            />
        </SafeAreaView>
    )
};

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White.rgb,
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textContainer: {
        width: width / 10 * 9
    },
    button: {
        width: width / 10 * 8,
        borderRadius: 5,
        backgroundColor: Colors.Red3.rgb
    }
});

