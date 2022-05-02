import React, {
  useEffect,
  useState
} from 'react';

import {
  View,
  StyleSheet,
  Text
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
import { NextButton } from '../../../..';
import { Colors, Fonts, sizes } from '../../../../../styles';
import { CappedInput, ProgressBar } from '../components';
import { useNewEvent } from './neweventstore';

export const NewEventScreen4 = ({ navigation, route }) => {
  const options = ['No', 'Yes'];
  const [selectedOption, setSelectedOption] = useState(0);
  const [newEvent, setNewEvent] = useNewEvent(state => [state.newEvent, state.setNewEvent]);

  const navigateNext = () => {
    navigation.navigate('NewEventScreen5');
    setNewEvent({
      isPhysical: options[selectedOption] === 'Yes'
    });
  };

  useEffect(() => {
    if(newEvent.location != null || newEvent.isVirtual) {
      navigation.setOptions({
        headerRight: () => <NextButton onPress={navigateNext}/>
      });
    } else {
      setTimeout(() => {
        navigation.setOptions({
          headerRight: null
        });
      }, 500);
    }
  }, [newEvent.location])

  return (
    <SafeAreaView
        style={styles.container}
        edges={['bottom','left','right']}
    >
      <ProgressBar
        progress={4 / 6}
      />
      <View style={styles.wrapper}>
        <Text style={styles.msg}>Can students attend the event in-person?</Text>
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
                Where is the event located?
            </Animated.Text>
            <Animated.View
              entering={FadeInUp.delay(100)}
              exiting={FadeOutUp.delay(100)}
            >
              {newEvent.location && 
                <Animated.View
                  entering={FadeInUp.delay(200)}
                  exiting={FadeOutUp.delay(100)}
                  style={{
                    margin: 10,
                  }}
                >
                  <Text style={Fonts.Graph2}>{newEvent.location.name}</Text>
                  <Text style={Fonts.Paragraph3}>{newEvent.location.address}</Text>
                </Animated.View>
              }
              <Button
                onPress={() => navigation.navigate('EditPhysicalEventScreen')}
                title={newEvent?.location ? 'Update Location' : 'Find Location'}
                type='outline'
                titleStyle={[Fonts.Paragraph2, {
                  color: newEvent?.location ? Colors.Green3.rgb : Colors.SteelBlue.rgb
                }]}
                buttonStyle={{
                  margin: 10,
                  borderColor: newEvent?.location ? Colors.Green3.rgb : Colors.SteelBlue.rgb
                }}
                icon={() => (
                  <Icon
                    name='chevron-right'
                    color={newEvent?.location ? Colors.Green3.rgb : Colors.SteelBlue.rgb}
                    size={sizes.Icon5}
                  />
                )}
                iconRight
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
                Is there any other information needed to attend in-person?
            </Animated.Text>
            <Animated.View
              entering={FadeInUp.delay(200)}
              exiting={FadeOutUp.delay(200)}
            >
              <CappedInput
                lines={20}
                placeholder='i.e. room #, secret handshakes, snacks, etc...'
                maxChars={100}
                value={newEvent.physicalInfo || ''}
                inputStyle={Fonts.Paragraph3}
                onChangeText={(text) => setNewEvent({ physicalInfo: text })}
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