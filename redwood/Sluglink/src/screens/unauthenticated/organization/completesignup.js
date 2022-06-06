import React, { useState, useCallback, useEffect, useRef } from 'react';

import {
    Text,
    StyleSheet,
    Alert
} from 'react-native';
import {
    Divider,
    Button
} from 'react-native-elements';
import { SafeAreaView } from "react-native-safe-area-context";
import FastImage from 'react-native-fast-image';
import functions from '@react-native-firebase/functions';
import stringHash from 'string-hash';

import { Colors, Fonts, width, height, sizes } from "../../../styles";
import { useStorage } from '../../../hooks';
import { BackButton } from './../../../navigators';
import { useSignUp } from './signupstore';
import { useHeaderHeight } from '@react-navigation/elements';

export const OrganizationCompleteSignUpScreen = ({ route, navigation }) => {
    const [organization, setOrganization] = useSignUp(state => [state.organization, state.setOrganization]);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadPhoto] = useStorage(state => [state.uploadPhoto]);

    const completeSignUp = useCallback(async () => {
        if (isLoading) return;

        setIsLoading(true);
        navigation.setOptions({
            headerLeft: null,
        });

        try {
            // Need to hash name
            const hash = stringHash(organization.email);
            let url;
            try {
                url = await uploadPhoto("OrganizationSignUp", hash, organization.photoURI);
            } catch (error) {
                console.log(error);
            }
            const orginfo = {
                email: organization.email.toLowerCase(),
                picture: url,
                name: organization.name,
                description: organization.description,
                category: organization.category,
                otherCategory: organization.otherCategory,
                contact: {
                    name: organization.contactName,
                    email: organization.contactEmail,
                    role: organization.contactRole
                },
            };

            functions().httpsCallable('orgsignup-newRegistration')(orginfo)
                .then(({ data }) => {
                    if (data.status == 'OK') {
                        navigation.navigate("OrganizationVerification");
                    }
                }).catch(e => {
                    console.error(e);
                    Alert.alert('An error occurred while registering your organization.');
                }).finally(() => {
                    setIsLoading(false);
                    navigation.setOptions({
                        headerLeft: () => <BackButton goBack={navigation.goBack} />,
                    });
                });
        } catch (e) {
            console.error(e);
        }

    }, [isLoading, navigation]);

    const headerHeight = useHeaderHeight();

    return (
        <SafeAreaView style={[styles.container, Platform.OS == "android" ? { marginTop: headerHeight, paddingTop: 20 } : {}]}>
            <FastImage
                style={styles.image}
                source={{ uri: organization.photoURI, priority: FastImage.priority.high }}
                resizeMode='cover'
            />
            <Text style={[Fonts.SubHeader2, { marginTop: 10 }]}>{organization.name}</Text>
            <Text style={[Fonts.Graph4, { marginVertical: 5 }]}>{organization.description}</Text>
            <Text style={[Fonts.Paragraph4]}>{organization.email}</Text>
            <Divider orientation='horizontal' width={1} style={{ width: width / 10 * 8, marginVertical: 5 }} />
            <Text style={Fonts.Label1}>Category</Text>
            <Text style={Fonts.Paragraph3}>{organization.category == 'Other' ? `Other (${organization.otherCategory})` : organization.category}</Text>
            <Text style={[Fonts.Label1, { marginTop: 10 }]}>Point of Contact</Text>
            <Text style={Fonts.Paragraph3}>{`${organization.contactName}, ${organization.contactRole}`}</Text>
            <Text style={Fonts.Paragraph3}>{organization.contactEmail}</Text>
            <Button
                title='Register and continue'
                titleStyle={Fonts.Paragraph2}
                onPress={completeSignUp}
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
    image: {
        width: width / 10 * 4,
        height: width / 10 * 4,
        borderRadius: 10,
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
    },
    button: {
        width: width / 10 * 8,
        borderRadius: 5,
        backgroundColor: Colors.Green3.rgb
    }
});

