import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
    Text,
    StyleSheet,
    Alert
} from 'react-native';
import {
    Icon,
    Input
} from 'react-native-elements';
import { SafeAreaView } from "react-native-safe-area-context";
import functions from '@react-native-firebase/functions';

import { Colors, Fonts } from "../../../styles";
import { NextButton } from './nextbutton';
import { useSignUp } from './signupstore';

export const OrganizationSignUpScreen = ({ navigation, route }) => {
    const [organization, setOrganization] = useSignUp(state => [state.organization, state.setOrganization]);
    let [email, setEmail] = useState(organization.email || '');
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    const validate = (text) => {
        const regex = /(@ucsc\.edu$)|(@gmail\.com$)/g;
        return text != null && text.match(regex);
    };

    const evaluateEmail = useCallback(() => {
        if(isLoading) return;

        setIsLoading(true);

        if(!validate(email)) {
            inputRef.current?.shake();
            return;
        }

        functions().httpsCallable('orgsignup-getStatus')({ email })
            .then(({ data }) => {
                const { status } = data;

                switch(status) {
                    case 'UNREGISTERED':
                        setOrganization({ email });
                        navigation.navigate('OrganizationSignUpDetailsPrimary');
                        break;
                    case 'REGISTERED':
                        if(data.organization.verified && data.student.verified) {
                            Alert.alert(
                                'Registered',
                                `${data.organization.name} has been registered and is in the process of being verified.`,
                                [
                                    {
                                        text: 'Sounds good!',
                                        onPress: () => navigation.goBack()
                                    }
                                ]
                            );
                            break;
                        } else {
                            setOrganization({
                                email,
                                name: data.organization.name,
                                contact: {
                                    email: data.student.email,
                                    name: data.student.name
                                }
                            });
                            navigation.navigate('OrganizationVerification');
                        }
                        break;
                    case 'VERIFIED':
                        Alert.alert(
                            'Verified',
                            `The organization ${data.organization.name} using ${email} has already been verified.`,
                            [
                                {
                                    text: 'Sounds good!',
                                    onPress: () => navigation.goBack()
                                }
                            ]
                        );
                        break;
                    default:
                        inputRef.current?.shake();
                        break;
                }
            }).catch(e => {
                inputRef.current?.shake();
                Alert.alert(
                    'Oops!',
                    `An error occurred while evaluating ${email}`,
                );
            }).finally(() => {
                setIsLoading(false);
            })
    }, [email, navigation, inputRef, isLoading]);

    useEffect(() => {

        if(email.length > 0 && validate(email)) {
            navigation.setOptions({
                headerRight: () => <NextButton onPress={evaluateEmail} />
            });
        } else {
            navigation.setOptions({
                headerRight: null,
            });
        }

    }, [email]);

    return (
        <SafeAreaView style={styles.container}>
            <Icon
                name='groups'
                size={200}
                color={Colors.Brown1.rgb}
            />
            <Text style={styles.subtext}>
                Your organization should use a dedicated @gmail.com or @ucsc.edu, separate from personal accounts.
            </Text>
            <Input
                autoFocus
                ref={inputRef}
                placeholder='organization@gmail.com'
                keyboardType='email-address'
                autoCompleteType='email'
                textContentType='emailAddress'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
                autoCapitalize='none'
                autoCorrect={false}
                clearButtonMode='always'
                value={email}
                onChangeText={setEmail}
                leftIcon={
                    <Icon
                        name="email"
                    />
                }
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
    subtext: {
        textAlign: 'center',
        ...Fonts.Paragraph4,
        marginBottom: 10,
    },
    box: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: 'red'
    },
    containerStyle: {
    },
    inputStyle: {
        ...Fonts.Paragraph4
    },
    inputContainerStyle: {
        marginTop: 10,
        backgroundColor: Colors.White.rgb,
        borderColor: Colors.Grey5.rgb,
        borderBottomWidth: 0.5,
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 5
    }
});

