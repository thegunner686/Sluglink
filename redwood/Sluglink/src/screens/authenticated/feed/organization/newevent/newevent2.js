import React, {
  useEffect, useState,
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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      navigation.setOptions({
        headerRight: () => (
          <NextButton onPress={() => {
            console.log("start: ", startDate);
            console.log("end: ", endDate);
            // setNewEvent({
            //   startDate: startDate.getTime(),
            //   endDate: endDate.getTime()
            // })
            navigation.navigate('NewEventScreen3')
          }
          } />
        )
      });
    }, 500);
  }, []);

  useEffect(() => {
    setNewEvent({
      startDate: startDate.getTime()
    })
  }, [startDate])

  useEffect(() => {
    setNewEvent({
      endDate: endDate.getTime()
    })
  }, [endDate])

  return (
    <SafeAreaView
      style={styles.container}
      edges={['bottom', 'left', 'right']}
    >
      <View>
        <TimePicker
          prompt='Select Start Time'
          value={startDate}
          onChange={(event, date) =>
            setStartDate(date)
          }
          minimumDate={new Date()}
        />
      </View>

      <View>
        <TimePicker
          prompt='Select End Time'
          value={endDate}
          onChange={(event, date) => {
            console.log(date)
            setEndDate(date)
          }}
          minimumDate={new Date()}
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
