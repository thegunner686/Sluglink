import React, { useEffect } from "react";

import {
    View,
    StyleSheet,
    Text,
    Alert
} from "react-native";
import {
    Button,
} from 'react-native-elements';
import FastImage from 'react-native-fast-image'
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Fonts, sizes, width } from "../../styles";
import { useAuth } from '../../hooks';

export const SignInScreen = ({ navigation }) => {
    const [signIn] = useAuth(state => [state.signIn]);

    const [user, isSignedIn] = useAuth(state => [state.user, state.isSignedIn]);

    useEffect(() => {
        if (user != null && isSignedIn()) {
            setTimeout(() => {
                navigation.navigate('Authenticated');
            }, 0);
        } else {
            navigation.navigate('Unauthenticated');
        }
    }, [user]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box}></View>
            <View style={styles.box}>
                <FastImage
                    style={styles.logo}
                    placeholderStyle={styles.logoPlaceholder}
                    source={require('../../../assets/sluglink_logo.png')}
                    resizeMode='contain'
                />
                <Text style={Fonts.Graph4}>
                    Your connection to UC Santa Cruz.
                </Text>
            </View>
            <View style={styles.box}></View>
            <View style={styles.box}>
                <Button
                    icon={() => (
                        <FastImage
                            source={require('../../../assets/google_white.png')}
                            style={{ width: sizes.Icon4, height: sizes.Icon4, marginRight: 10, }}
                        />
                    )}
                    buttonStyle={[styles.button, styles.student]}
                    titleStyle={Fonts.Paragraph2}
                    title='Sign in to Sluglink'
                    onPress={async () => {
                        let r = await signIn();
                        if (!r) {
                            Alert.alert("You are still under review, please try again later");
                        }
                    }}
                />
                <Text style={[Fonts.Label2, {
                    marginTop: 15,
                    color: Colors.Grey3.rgb,
                }]}>OR</Text>
                <Button
                    type='clear'
                    buttonStyle={[styles.button, styles.organization]}
                    titleStyle={[Fonts.Paragraph2, {
                        color: Colors.SteelBlue.rgb
                    }]}
                    title='Register your Organization'
                    onPress={() => navigation.navigate("OrganizationSignUp")}
                />
            </View>
            <View style={styles.box}></View>
        </SafeAreaView>
    );
};

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White.rgb,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center"
    },
    logo: {
        width: width / 10 * 8,
        height: 80,
    },
    logoPlaceholder: {
        backgroundColor: 'transparent',
    },
    button: {
        width: width / 10 * 9,
        height: width / 10,
        marginVertical: 5
    },
    student: {
        backgroundColor: Colors.SteelBlue.rgb
    },
    organization: {
    },
});
