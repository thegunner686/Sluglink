import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { ExploreScreen } from '../screens';

const Stack = createStackNavigator();

export const ExploreStack = () => {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                title: 'Explore'
            })}
        >
            <Stack.Screen
                name='ExploreScreen'
                component={ExploreScreen}
            />
        </Stack.Navigator>
    )
}