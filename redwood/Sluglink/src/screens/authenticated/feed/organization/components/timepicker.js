import React, {
  useState
} from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import {
  Icon
} from 'react-native-elements';
import Animated, {
  FadeInLeft,
} from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Fonts, Colors, height, sizes, width } from '../../../../../styles';

export const TimePicker = ({
  value,
  onChange,
  prompt,
  minimumDate,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Animated.View
      entering={FadeInLeft.delay(200)}
      style={styles.container}
    >
      <Text style={[Fonts.SubHeader4]}>{prompt}</Text>
      <DateTimePicker
        minimumDate={minimumDate}
        mode='datetime'
        display='default'
        style={{ width: "100%", marginRight: "50%", marginTop: "5%" }}
        value={value}
        onChange={onChange}
      />
    </Animated.View>
  )
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    height: height / 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonTitle: {
    color: Colors.SteelBlue.rgb,
    ...Fonts.Paragraph2
  },
  pickerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  }
});
