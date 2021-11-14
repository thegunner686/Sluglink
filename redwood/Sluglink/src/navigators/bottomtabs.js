import React from 'react';

import {
    Icon
} from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ProfileStack } from './profile';
import { FeedStack } from './feed';
import { ExploreStack } from './explore';
import { useAuth } from '../hooks';
import { SettingsDrawer } from './settings';

const Tabs = createBottomTabNavigator();

export const BottomTabs = () => {
    const [customClaims] = useAuth(state => [state.customClaims]);

    return (
        <Tabs.Navigator
            initialRouteName='Feed'
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    switch(route.name) {
                        case 'Feed':
                            iconName = 'home';
                            break;
                        case 'Explore':
                            iconName = 'explore';
                            break;
                        case 'Profile':
                            iconName = customClaims?.organization ? 'groups' : 'person';
                            break;
                    }
                    return <Icon
                                type='material'
                                name={iconName}
                                color={color}
                            />;
                },
                unmountOnBlur: true
            })}
        >
            <Tabs.Screen
                name='Feed'
                component={FeedStack}
            />
            <Tabs.Screen
                name='Explore'
                component={ExploreStack}
            />
            <Tabs.Screen
                name='Profile'
                component={SettingsDrawer}
            />
        </Tabs.Navigator>
    )
}