import React, {
  useEffect,
  useState
} from 'react';

import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import Animated, {
  FadeInLeft
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts } from '../../../../../styles';import { NextButton } from '../../../../unauthenticated';
;
import { CappedInput, ProgressBar, TimePicker } from '../components';
import { useNewEvent } from './neweventstore';

export const NewEventScreen = ({ navigation }) => {
  const [newEvent, setNewEvent] = useNewEvent(state => [state.newEvent, state.setNewEvent]);

  useEffect(() => {
    if(newEvent.title != null && newEvent.title.length > 0) {
      navigation.setOptions({
        headerRight: () => (
          <NextButton onPress={() => 
            navigation.navigate('NewEventScreen2')
          }/>
        )
      })
    } else {
      navigation.setOptions({
        headerRight: null
      })
    }
  }, [newEvent]);


  return (
    <SafeAreaView
      style={styles.container}
      edges={['bottom', 'left', 'right', 'top']}
    >
      <ProgressBar
        progress={1 / 6}
      />
      <Animated.Text
        entering={FadeInLeft.delay(500)}
        style={styles.msg}
      >
        Event Title
      </Animated.Text>
      <Animated.View
        entering={FadeInLeft.delay(100)}
        style={{ marginBottom: "20%" }}
      >
        <CappedInput
          autoFocus
          placeholder='Add a title'
          inputStyle={Fonts.Graph3}
          value={newEvent.title}
          onChangeText={(text) => setNewEvent({ title: text })}
          maxChars={50}
          clearButtonMode='while-editing'
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White.rgb,
  },
  msg: {
    alignSelf: "center",
    marginBottom: "10%",
    marginTop: "20%",
    ...Fonts.Header1
  }
});
