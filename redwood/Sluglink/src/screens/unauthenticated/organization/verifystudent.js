import React, { useState, useCallback, useEffect, useRef } from 'react';

import {
    Text,
    StyleSheet
} from 'react-native';
import {
    Icon,
    Input,
    Button
} from 'react-native-elements';
import { SafeAreaView } from "react-native-safe-area-context";
import functions from '@react-native-firebase/functions';

import { NextButton } from './nextbutton';
import { Colors, Fonts, width } from "../../../styles";
import { useSignUp } from './signupstore';

export const StudentVerificationScreen = ({ route, navigation }) => {
    const [organization, setOrganization] = useSignUp(state => [state.organization, state.setOrganization]);
    const [studentVerificationCode, setStudentVerificationCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {

        if (isVerified) {
            navigation.setOptions({
                headerRight: () => <NextButton onPress={goToNextScreen} />
            });
        } else {
            navigation.setOptions({
                headerRight: null
            });
        };
    }, [isVerified]);

    const verifyCode = useCallback(() => {
        if (isLoading) return;
        if (studentVerificationCode == null || studentVerificationCode.trim() == '' || studentVerificationCode.length != 6) {
            inputRef.current?.shake();
            return;
        }

        setIsLoading(true);

        const verificationinfo = {
            email: organization.email,
            type: 'Student',
            code: studentVerificationCode
        };

        functions().httpsCallable('orgsignup-verifyCode')(verificationinfo)
            .then(({ data }) => {
                if (data.status == 'OK') {
                    if (data.verified) {
                        navigation.navigate("OrganizationSignUpNextSteps");
                    } else {
                        inputRef.current?.shake();
                        setStudentVerificationCode('');
                    }
                } else if (data.status == 'ERROR') {
                    Alert.alert(data.message);
                }
            }).catch(e => {
                console.error(e);
                Alert.alert('An error occurred while verifying the code.');
            }).finally(() => {
                setIsLoading(false);
            });

    }, [studentVerificationCode, isLoading]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Candidate for Remote Config */}
            <Text style={{
                ...Fonts.Graph3,
                padding: 10,
                textAlign: 'center'
            }}>Enter the verification code sent to {organization.contactEmail}</Text>
            <Input
                autoFocus
                ref={inputRef}
                placeholder="ex. 123456"
                inputStyle={styles.inputStyle}
                inputContainerStyle={[styles.inputContainerStyle, {
                    marginTop: 20,
                }]}
                leftIconContainerStyle={styles.leftIconContainerStyle}
                onChangeText={setStudentVerificationCode}
                value={studentVerificationCode}
                clearButtonMode='always'
                returnKeyType='done'
                autoCorrect={false}
                keyboardType="numeric"
            />
            <Button
                title='Verify'
                titleStyle={Fonts.Paragraph2}
                onPress={verifyCode}
                containerStyle={{ marginVertical: 40 }}
                buttonStyle={styles.button}
                loading={isLoading}
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
    inputStyle: {
        ...Fonts.Paragraph4,
        textAlign: 'left'
    },
    inputContainerStyle: {
        backgroundColor: Colors.White.rgb,
        borderColor: Colors.Grey5.rgb,
        borderBottomWidth: 0.5,
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 5
    },
    button: {
        width: width / 10 * 8,
        borderRadius: 5,
        backgroundColor: Colors.Green3.rgb
    }
});

