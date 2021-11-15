import 'react-native-gesture-handler';
import '@react-native-firebase/app';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

firestore().settings({ persistence: false });

// Use a local emulator in development
if (__DEV__) {
  console.log("Running in development.");
  // const host = 'localhost';
  // const host = '100.64.35.59'; // Eduroam
  const host = '100.64.36.2'; // Reswifi
  // If you are running on a physical device, replace http://localhost with the local ip of your PC. (http://192.168.x.x)
  auth().useEmulator(`http://${host}:9099`);
  functions().useFunctionsEmulator(`http://${host}:5001`);
  firestore().useEmulator(host, 8080);
  storage().useEmulator(host, 9199);
}

AppRegistry.registerComponent(appName, () => App);
