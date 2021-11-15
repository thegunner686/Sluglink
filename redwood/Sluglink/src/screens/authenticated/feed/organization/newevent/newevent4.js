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
import { CappedInput } from '../components';
import { useNewEvent } from './neweventstore';

export const NewEventScreen4 = ({ navigation, route }) => {
  const options = ['No', 'Yes'];
  const [selectedOption, setSelectedOption] = useState(0);
  const [newEvent, setNewEvent] = useNewEvent(state => [state.newEvent, state.setNewEvent]);

  useEffect(() => {
    if(newEvent.location != null) {
      navigation.setOptions({
        headerRight: () => <NextButton />
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
              Is there anything else they need to know to attend?
          </Animated.Text>
          <Animated.View
            entering={FadeInUp.delay(200)}
            exiting={FadeOutUp.delay(200)}
          >
            <CappedInput
              multiline={true}
              lines={20}
              placeholder='Additional information for in-person goers: i.e. what to wear, bring, extra directions, etc...'
              maxChars={300}
              value={newEvent.physicalInfo || ''}
              inputContainerStyle={{
                height: 120,
                alignItems: 'flex-start'
              }}
              inputStyle={Fonts.Paragraph3}
              onChangeText={(text) => setNewEvent({ physicalInfo: text })}
            />
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White.rgb,
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