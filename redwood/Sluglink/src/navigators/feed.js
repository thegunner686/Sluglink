import React, { useMemo } from 'react';

import {
    StyleSheet
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';

import { FeedScreen } from '../screens';
import { NewPostStack } from './newpost';
import { Colors, Fonts, width } from '../styles';

const Stack = createStackNavigator();

export const FeedStack = () => {

    const Logo = useMemo(() => {
        return <FastImage
                style={styles.logo}
                placeholderStyle={styles.logoPlaceholder}
                source={require('../../assets/sluglink_logo.png')}
                resizeMode='contain'
            />;
    }, []);

    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerTitle: () => Logo,
            })}
        >
            <Stack.Screen
                name='FeedScreen'
                component={FeedScreen}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: width / 2,
        height: 30,
    },
    placeholderStyle: {
        backgroundColor: Colors.White.rgb
    }
})
