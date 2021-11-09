import React, { useState, useCallback, useEffect, useRef } from 'react';

import {
    Text,
    StyleSheet
} from 'react-native';
import {
    Icon,
    Input
} from 'react-native-elements';
import { SafeAreaView } from "react-native-safe-area-context";

import { NextButton } from './nextbutton';
import { Colors, Fonts, width, height, sizes } from "../../../styles";
import { useSignUp } from './signupstore';

export const OrganizationSignUpDetailsTertiaryScreen = ({ route, navigation }) => {
    const [organization, setOrganization] = useSignUp(state => [state.organization, state.setOrganization]);
    const [contactName, setContactName] = useState(organization.contactName || '');
    const [contactEmail, setContactEmail] = useState(organization.contactEmail || '');
    const [contactRole, setContactRole] = useState(organization.contactRole || '');
    const emailInputRef = useRef(null);
    const roleInputRef = useRef(null);

    useEffect(() => {

        const validate = (text) => {
            const regex = /@ucsc\.edu$/g;
            return text != null && text.match(regex);
        }

        const goToNextScreen = () => {
            setOrganization({ contactName, contactEmail, contactRole })
            navigation.navigate('OrganizationCompleteSignUp');
        };

        if(contactName != '' && validate(contactEmail) && contactRole != '') {
            navigation.setOptions({
                headerRight: () => <NextButton onPress={goToNextScreen} />
            });
        } else {
            navigation.setOptions({
                headerRight: null
            });
        }
    }, [contactName, contactEmail, contactRole]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Candidate for Remote Config */}
            <Text style={Fonts.Paragraph3}>The point of contact must have an @ucsc.edu email.</Text>
            <Input
                autoFocus
                placeholder="First and last name"
                inputStyle={styles.inputStyle}
                inputContainerStyle={[styles.inputContainerStyle, {
                    marginTop: 20,
                }]}
                leftIconContainerStyle={styles.leftIconContainerStyle}
                clearButtonMode='always'
                returnKeyType='next'
                value={contactName}
                onChangeText={setContactName}
                autoCapitalize='words'
                autoCorrect={false}
                onSubmitEditing={() => emailInputRef.current?.focus()}
                leftIcon={
                    <Icon
                        name="person"
                    />
                }
            />
            <Input
                ref={emailInputRef}
                placeholder="Email"
                keyboardType='email-address'
                autoCompleteType='email'
                textContentType='emailAddress'
                autoCapitalize='none'
                autoCorrect={false}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                leftIconContainerStyle={styles.leftIconContainerStyle}
                clearButtonMode='always'
                returnKeyType='next'
                value={contactEmail}
                onChangeText={setContactEmail}
                onSubmitEditing={() => roleInputRef.current?.focus()}
                leftIcon={
                    <Icon
                        name="email"
                    />
                }
            />
            <Input
                ref={roleInputRef}
                placeholder="Role in organization"
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                leftIconContainerStyle={styles.leftIconContainerStyle}
                clearButtonMode='always'
                returnKeyType='done'
                value={contactRole}
                onChangeText={setContactRole}
                autoCorrect={false}
                leftIcon={
                    <Icon
                        name="workspaces-filled"
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
    picker: {
        width: width / 10 * 8,
        height: 'auto'
    },
    pickerItem: {
        ...Fonts.Paragraph4
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
    }
});

