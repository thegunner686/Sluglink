import React from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Fonts, width } from '../../../styles';

export const NewUserWelcomeScreen = () => {
    return (
        <SafeAreaView>
            <Text style={styles.welcome}>Welcome to</Text>
            <FastImage
                source={require('../../../../assets/slugline_logo.png')}
                style={styles.image}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    welcome: {

    },
    image: {
        width: width / 10 * 8,
        height: 60
    }
});
