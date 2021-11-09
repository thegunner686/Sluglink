import React, { useEffect } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator
} from "@react-navigation/stack";
import { Provider as PaperProvider } from 'react-native-paper';

import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// import remoteConfig from '@react-native-firebase/remote-config';

// import default_config from "./default_firebase_remote_config";
import { AuthenticatedStack, UnauthenticatedStack } from './src/navigators';
import { useAuth } from "./src/hooks";
const Stack = createStackNavigator()

function App() {
  let [user, isSignedIn] = useAuth(state => [state.user, state.isSignedIn]);
  let [onAuthStateChanged] = useAuth(state => [state.onAuthStateChanged]);

  useEffect(() => {
    const listener = onAuthStateChanged();
    return () => {
      listener();
    };
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
