import React, {
  useEffect, useState,
} from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts } from '../../../../../styles';;
import { TimePicker } from '../components';
import { useNewEvent } from './neweventstore';
import { ProgressBar } from '../components';
import { NextButton } from '../../../../unauthenticated';

export const NewEventScreen2 = ({ navigation, route }) => {
  const [newEvent, setNewEvent] = useNewEvent(state => [state.newEvent, state.setNewEvent]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      navigation.setOptions({
        headerRight: () => (
          <NextButton onPress={() => {
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
      <ProgressBar
        progress={2 / 6}
      />
      <View style={{ marginTop: "30%", flex: 1 }}>
        <TimePicker
          prompt='When is the start time?'
          value={startDate}
          onChange={(event, date) =>
            setStartDate(date)
          }
          minimumDate={new Date()}
        />
      </View>

      <View style={{ flex: 1 }}>
        <TimePicker
          prompt='When is the end time?'
          value={endDate}
          onChange={(event, date) => {
            setEndDate(date)
          }}
          minimumDate={startDate}
        />
      </View>
      <View style={{ flex: 1}}></View>
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
