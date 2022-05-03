import React, { useEffect } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator
} from "@react-navigation/native-stack";
import { Provider as PaperProvider } from 'react-native-paper';
import { enableScreens } from 'react-native-screens';

import remoteConfig from '@react-native-firebase/remote-config';

import default_config from './src/remote_config/default';
import { AuthenticatedStack, UnauthenticatedStack } from './src/navigators';
import { useAuth } from "./src/hooks";

enableScreens(true);

const Stack = createNativeStackNavigator()

function App() {
  let [user] = useAuth(state => [state.user, state.isSignedIn]);
  let [onAuthStateChanged] = useAuth(state => [state.onAuthStateChanged]);

  useEffect(() => {
    const listener = onAuthStateChanged();
    return () => {
      listener();
    };
  }, []);

  useEffect(() => {
    // caache is set to 5 min... for testing purposes
    const setCache = async () => {
      try {
        await remoteConfig().fetch(1);
      } catch (error) {
        console.log(error);
      }
    };
    setCache();
    remoteConfig().setDefaults(default_config)
      .then(() => remoteConfig().fetchAndActivate())
      .then((fetched) => {
        if(fetched) {
          console.log('Remote config initialized');
        } else {
          console.log('Remote config failed to initialize.');
        }
      });
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PaperProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: false
            }}
          >
            {user != null ? (
              <Stack.Screen
                name='Authenticated'
                component={AuthenticatedStack}
              />
            ): <></>}
            <Stack.Screen
              name='Unauthenticated'
              component={UnauthenticatedStack}
            />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App;
