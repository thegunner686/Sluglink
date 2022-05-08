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
import { Colors, Fonts } from '../../../../../styles'; import { NextButton } from '../../../../unauthenticated';
;
import { CappedInput, ProgressBar, TimePicker } from '../components';
import { useNewEvent } from './neweventstore';

export const NewEventScreen5 = ({ navigation }) => {
  const [newEvent, setNewEvent] = useNewEvent(state => [state.newEvent, state.setNewEvent]);

  useEffect(() => {
    setTimeout(() => {
      navigation.setOptions({
        headerRight: () => (
          <NextButton onPress={() =>
            navigation.navigate('NewEventScreen6')
          } />
        )
      });
    }, 500);
  }, []);


  return (
    <SafeAreaView
      style={styles.container}
      edges={['bottom', 'left', 'right', 'top']}
    >
      <ProgressBar
        progress={5 / 6}
      />
      <Animated.Text
        entering={FadeInLeft.delay(500)}
        style={styles.msg}
      >
        What should people know about this event?
      </Animated.Text>
      <Animated.View
        entering={FadeInLeft.delay(100)}
        style={{ marginBottom: "20%" }}
      >
        <CappedInput
          autoFocus
          multiline={true}
          placeholder='Give your event a description'
          inputStyle={{
            ...Fonts.Paragraph3,
            height: 150
          }}
          value={newEvent.description}
          onChangeText={(text) => setNewEvent({ description: text })}
          maxChars={300}
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
    ...Fonts.Graph2,
    paddingHorizontal: 10,
  }
});
