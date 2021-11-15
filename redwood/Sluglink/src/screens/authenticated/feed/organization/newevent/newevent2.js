import React, {
  useEffect,
} from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NextButton } from '../../../..';
import { Colors, Fonts } from '../../../../../styles';;
import { TimePicker } from '../components';
import { useNewEvent } from './neweventstore';

export const NewEventScreen2 = ({ navigation, route }) => {
  const [newEvent, setNewEvent] = useNewEvent(state => [state.newEvent, state.setNewEvent]);
  
  useEffect(() => {
    setTimeout(() => {
      navigation.setOptions({
        headerRight: () => (
          <NextButton onPress={() => 
            navigation.navigate('NewEventScreen3')
          }/>
        )
      });
    }, 500);
  }, []);

  return (
    <SafeAreaView
        style={styles.container}
        edges={['bottom','left','right']}
    >
      <View>
        <TimePicker
          prompt='Select Start Time'
          value={newEvent.startDate || new Date()}
          onChange={(event, date) => setNewEvent({
            startDate: date
          })}
          minimumDate={new Date()}
        />
      </View>

      <View>
        <TimePicker
          prompt='Select End Time'
          value={newEvent.endDate || new Date()}
          onChange={(event, date) => setNewEvent({
            endDate: date
          })}
          minimumDate={newEvent.startDate}
        />
      </View>

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
  }
});
