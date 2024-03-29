import React, {
  useEffect,
  useState,
  useCallback
} from 'react';

import {
  View,
  StyleSheet,
  Text
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
import { NextButton } from '../../../..';
import { Colors, Fonts } from '../../../../../styles';
import { StyledInput } from '../../../../components';
import { CappedInput, ProgressBar } from '../components';
import { useNewEvent } from './neweventstore';

export const NewEventScreen3 = ({ navigation, route }) => {
  const options = ['No', 'Yes'];
  const [selectedOption, setSelectedOption] = useState(0);
  const [newEvent, setNewEvent] = useNewEvent(state => [state.newEvent, state.setNewEvent])

  const navigateNext = useCallback(() => {
    navigation.navigate('NewEventScreen4');
    setNewEvent({
      isVirtual: options[selectedOption] === 'Yes'
    });
  }, [navigation, setNewEvent, options, selectedOption]);

  useEffect(() => {
    if(options[selectedOption] === 'Yes') {
      if(newEvent.link != null && newEvent.link.length > 0) {
        setTimeout(() => {
          navigation.setOptions({
            headerRight: () => (
              <NextButton
                onPress={navigateNext}
              />
            )
          });
        }, 0);
      } else {
        setTimeout(() => {
          navigation.setOptions({
            headerRight: null
          })
        }, 0);
      }
    } else {
      setTimeout(() => {
        navigation.setOptions({
          headerRight: () => (
            <NextButton
              onPress={navigateNext}
            />
          )
        })
      }, 500);
    }
  }, [newEvent, selectedOption, setNewEvent, navigateNext]);
  return (
    <SafeAreaView
        style={styles.container}
        edges={['bottom','left','right']}
    >
      <ProgressBar
        progress={3 / 6}
      />
      <View style={styles.wrapper}>
        <Text style={styles.msg}>Can students attend the event virtually?</Text>
        <ButtonGroup
          onPress={setSelectedOption}
          buttons={options}
          selectedIndex={selectedOption}
          textStyle={Fonts.Paragraph2}
        />
        {options[selectedOption] === 'Yes' && (
          <View style={styles.info}>
            <Animated.Text 
              entering={FadeInLeft}
              exiting={FadeOutLeft}
              style={{
                margin: 10,
                ...Fonts.Paragraph3
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
                ...Fonts.Paragraph3
              }}
            >
                Is there any other information virtual-goers need?
            </Animated.Text>
            <Animated.View
              entering={FadeInUp.delay(200)}
              exiting={FadeOutUp.delay(200)}
            >
              <CappedInput
                lines={20}
                placeholder='i.e. passwords, additional instructions, etc...'
                maxChars={100}
                value={newEvent.virtualInfo || ''}
                inputStyle={Fonts.Paragraph3}
                onChangeText={(text) => setNewEvent({
                  virtualInfo: text
                })}
              />
            </Animated.View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White.rgb,
  },
  wrapper: {
    marginTop: 30,
    flex: 1,
  },
  msg: {
    margin: 10,
    ...Fonts.Paragraph3
  },
  info: {
    flex: 1,
    paddingTop: 10,
  }
});