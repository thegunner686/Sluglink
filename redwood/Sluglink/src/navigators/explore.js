import React from 'react';

import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ExploreScreen } from '../screens';
import { Fonts, Colors } from '../styles';

const Stack = createNativeStackNavigator();

export const ExploreStack = () => {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerTitle: () => <Text style={Fonts.Paragraph3}>Discover Organizations</Text>,
            })}
        >
            <Stack.Screen
                name='ExploreScreen'
                component={ExploreScreen}
            />
        </Stack.Navigator>
    )
}