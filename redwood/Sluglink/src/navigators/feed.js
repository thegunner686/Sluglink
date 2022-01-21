import React, { useMemo } from 'react';

import {
    StyleSheet
} from 'react-native';
import {
    Image
} from 'react-native-elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FeedScreen } from '../screens';
import { Colors, Fonts, width } from '../styles';
import Animated, {
    FadeInUp,
    FadeOutUp
} from 'react-native-reanimated';

const Stack = createNativeStackNavigator();

export const FeedStack = () => {

    const Logo = () => (
        <Animated.View
            style={{ flexShrink: 1 }}
            entering={FadeInUp.delay(500)}
            exiting={FadeOutUp}
        >
            <Image
                style={styles.logo}
                placeholderStyle={styles.logoPlaceholder}
                source={require('../../assets/sluglink_logo.png')}
                resizeMode='contain'
            />
        </Animated.View>
    )

    return (
        <Stack.Navigator
            // screenOptions={({ route }) => ({
            //     headerTitle: () => <Logo />,
            // })}
        >
            <Stack.Screen
                name='FeedScreen'
                component={FeedScreen}
                options={{
                    headerTitle: () => <Logo />,
                }}
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
