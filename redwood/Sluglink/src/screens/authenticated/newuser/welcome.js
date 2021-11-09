import React from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {
    Image
} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Fonts, width } from '../../../styles';

export const NewUserWelcomeScreen = () => {
    return (
        <SafeAreaView>
            <Text style={styles.welcome}>Welcome to</Text>
            <Image
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
