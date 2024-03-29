import React, { useEffect } from 'react';

import {
    Text
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { ProfileStack } from './profile';
import { Fonts, Colors } from '../styles';
import { AccountScreen } from '../screens';

const Drawer = createDrawerNavigator();

export const SettingsDrawer = () => {

    return (
        <Drawer.Navigator
            initialRouteName='ProfileStack'
            screenOptions={({ navigation, route }) => ({
                drawerType: 'slide',
                drawerPosition: 'right',
                headerTitle: () => <Text style={Fonts.Paragraph3}>{route.name}</Text>,
                drawerStyle: {
                    right: 0,
                    width: "50%"
                }
            })}
        >
            <Drawer.Screen
                name='ProfileStack'
                component={ProfileStack}
                options={{
                    headerShown: false,
                    title: 'Profile'
                }}
            />
            <Drawer.Screen
                name='Account'
                component={AccountScreen}
            />
        </Drawer.Navigator>
    )
}