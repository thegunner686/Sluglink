import React, {
  useEffect,
  useState
} from 'react';

import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import {
  ButtonGroup
} from 'react-native-elements';
import Animated, {
  FadeInLeft,
  FadeOutLeft,
  FadeInUp,
  FadeOutUp,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts } from '../../../../../styles';
import { StyledInput } from '../../../../components';
import { CappedInput, TimePicker } from '../components';
import { useNewEvent } from './neweventstore';
import SwitchSelector from "react-native-switch-selector";
import { ProgressBar } from '../components';
import { NextButton } from '../components';

export const NewEventScreen3 = ({ navigation, route }) => {
  const options = ['No', 'Yes'];
  const [selectedOption, setSelectedOption] = useState(0);
  const [newEvent, setNewEvent] = useNewEvent(state => [state.newEvent, state.setNewEvent])

  const navigateNext = () => {
    setNewEvent({
      isVirtual: options[selectedOption] === 'Yes'
    });
    navigation.navigate('NewEventScreen4');
  };

  // useEffect(() => { console.log(newEvent); })

  // useEffect(() => {
  //   if (options[selectedOption] === 'Yes') {
  //     if (newEvent.link != null && newEvent.link.length > 0) {
  //       navigation.setOptions({
  //         headerRight: () => (
  //           <NextButton
  //             onPress={navigateNext}
  //           />
  //         )
  //       })
  //     } else {
  //       navigation.setOptions({
  //         headerRight: null
  //       })
  //     }
  //   } else {
  //     setTimeout(() => {
  //       navigation.setOptions({
  //         headerRight: () => (
  //           <NextButton
  //             onPress={navigateNext}
  //           />
  //         )
  //       })
  //     }, 500);
  //   }
  // }, [newEvent, selectedOption]);

  return (
    <SafeAreaView
      style={styles.container}
      edges={['bottom', 'left', 'right']}
    >
      <ProgressBar
        progress={3 / 6}
      />
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <Text style={styles.msg}>Can students attend the event virtually?</Text>
          <SwitchSelector
            options={[{ label: "Yes", value: 1 }, { label: "No", value: 0 }]}
            textColor={'#000000'}
            buttonColor={'white'}
            borderColor={'#E8E8E8'}
            backgroundColor={"#E8E8E8"}
            hasPadding
            initial={1}
            selectedTextStyle={{ color: "#00509D", ...Fonts.Graph2, fontWeight: 60 }}
            textStyle={{ ...Fonts.Graph2, fontWeight: 60 }}
            onPress={val => setSelectedOption(val)}
            style={{ width: "90%", marginHorizontal: "5%" }}
            height={50}
          />
          <View style={styles.info}>
            {options[selectedOption] === 'Yes' && (
              <View style={{ flex: 1 }}>
                <Animated.Text
                  entering={FadeInLeft}
                  exiting={FadeOutLeft}
                  style={{
                    margin: 10,
                    fontSize: 15,
                    fontWeight: "600",
                  }}
                >
                  What link should they use to join?
                </Animated.Text>
                <Animated.View
                  entering={FadeInUp.delay(100)}
                  exiting={FadeOutUp.delay(100)}
                >
                  <StyledInput
                    autoFocus
                    placeholder='https://www.example.com'
                    value={newEvent.link || ''}
                    onChangeText={(text) => setNewEvent({
                      link: text
                    })}
                    autoCapitalize='none'
                    clearButtonMode='while-editing'
                    autoCorrect={false}
                    inputStyle={[Fonts.Paragraph3, {
                      color: Colors.SteelBlue.rgb
                    }]}
                  />
                </Animated.View>
                <Animated.Text
                  entering={FadeInLeft}
                  exiting={FadeOutLeft}
                  style={{
                    marginHorizontal: 10,
                    fontSize: 15,
                    fontWeight: '600',
                  }}
                >
                  Is there anything else they need to know to attend?
                </Animated.Text>
                <Animated.View
                  entering={FadeInUp.delay(200)}
                  exiting={FadeOutUp.delay(200)}
                >
                  <CappedInput
                    multiline={true}
                    lines={20}
                    placeholder='Additional information for virtual goers: i.e. passwords, instructions, etc...'
                    maxChars={300}
                    value={newEvent.virtualInfo || ''}
                    inputContainerStyle={{
                      height: 120,
                      alignItems: 'flex-start'
                    }}
                    inputStyle={Fonts.Paragraph3}
                    onChangeText={(text) => setNewEvent({
                      virtualInfo: text
                    })}
                  />
                </Animated.View>
              </View>
            )}
          </View>
          <View style={{ marginBottom: "5%" }}>
            <NextButton
              on={(newEvent.link != null && newEvent.link.length > 0) || !selectedOption}
              onPress={() => navigateNext()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White.rgb,
  },
  msg: {
    marginBottom: 20,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: "center",
    marginTop: "20%",
  },
  info: {
    flex: 1,
    paddingTop: 10,
  }
});
