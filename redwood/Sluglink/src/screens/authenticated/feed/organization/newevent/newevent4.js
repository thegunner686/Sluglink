import React, {
  useEffect,
  useState
} from 'react';

import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView
} from 'react-native';
import {
  ButtonGroup,
  Button,
  Icon
} from 'react-native-elements';
import Animated, {
  FadeInLeft,
  FadeOutLeft,
  FadeInUp,
  FadeOutUp,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, sizes } from '../../../../../styles';
import { CappedInput } from '../components';
import { useNewEvent } from './neweventstore';
import { ProgressBar } from '../components';
import { NextButton } from '../components';

export const NewEventScreen4 = ({ navigation, route }) => {
  const [newEvent, setNewEvent] = useNewEvent(state => [state.newEvent, state.setNewEvent]);

  const navigateNext = () => {
    navigation.navigate('NewEventScreen45');
  };

  useEffect(() => { setNewEvent({ location: "Porter" }) }, [])

  // useEffect(() => {
  //   if (newEvent.location != null || options[selectedOption] === 'No') {
  //     navigation.setOptions({
  //       headerRight: () => <NextButton onPress={navigateNext} />
  //     });
  //   } else {
  //     setTimeout(() => {
  //       navigation.setOptions({
  //         headerRight: null
  //       });
  //     }, 500);
  //   }
  // }, [newEvent.location])

  return (
    <SafeAreaView
      style={styles.container}
      edges={['bottom', 'left', 'right']}
    >

      <ProgressBar
        progress={4 / 6}
      />
      <KeyboardAvoidingView style={styles.info}>
        <Animated.Text
          entering={FadeInLeft}
          exiting={FadeOutLeft}
          style={[styles.msg, { marginBottom: "3%" }]}
        >
          Where is the event located?
        </Animated.Text>
        <Animated.View
          entering={FadeInUp.delay(100)}
          exiting={FadeOutUp.delay(100)}
          style={{ width: "100%" }}
        >
          {/* {newEvent.location &&
            <Animated.View
              entering={FadeInUp.delay(200)}
              exiting={FadeOutUp.delay(100)}
              style={{

              }}
            >
              <Text style={Fonts.Graph2}>{newEvent.location.name}</Text>
              <Text style={Fonts.Paragraph3}>{newEvent.location.address}</Text>
            </Animated.View>
          } */}
          <Button
            onPress={() => navigation.navigate('EditPhysicalEventScreen')}
            title={newEvent?.location ? 'Update Location' : 'Find Location'}
            // type='outline'
            titleStyle={[styles.msg, {
              color: "white",
              paddingVertical: 10
            }]}
            buttonStyle={{
              margin: 10,
              backgroundColor: "#00509D",
              width: "80%",
              alignSelf: "center",
              marginBottom: "10%"
            }}
          />
        </Animated.View>
        <Animated.Text
          entering={FadeInLeft}
          exiting={FadeOutLeft}
          style={[styles.msg, { marginBottom: "3%" }]}
        >
          Any additional information about the event?
        </Animated.Text>
        <Animated.View
          entering={FadeInUp.delay(200)}
          exiting={FadeOutUp.delay(200)}
          style={{ width: "100%", marginBottom: "30%" }}
        >
          <CappedInput
            multiline={true}
            lines={20}
            placeholder='Additional information for in-person goers: i.e. what to wear, bring, extra directions, etc...'
            maxChars={300}
            value={newEvent.physicalInfo || ''}
            inputContainerStyle={{
              height: 150,
              alignItems: 'flex-start'
            }}
            inputStyle={Fonts.Paragraph3}
            onChangeText={(text) => setNewEvent({ physicalInfo: text })}
          />
        </Animated.View>
        <NextButton
          onPress={navigateNext}
          on={newEvent && newEvent?.location}
        />
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White.rgb,
  },
  msg: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
    marginTop: "20%"
    // marginBottom: "10%"
  }
});
