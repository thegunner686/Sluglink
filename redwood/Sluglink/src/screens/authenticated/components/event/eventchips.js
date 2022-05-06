import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import {
  Chip,
  Icon
} from 'react-native-elements';

import { Colors, Fonts, sizes } from '../../../../styles';

export const EventChips = React.memo(({
  isPhysical,
  isVirtual
}) => {
  return (
    <View style={styles.row}>
      {isPhysical && 
        <Chip
          title='In-Person'
          titleStyle={{color: Colors.White.rgb, ...Fonts.Label3}}
          buttonStyle={{ backgroundColor: Colors.Red3.rgb, padding: 5 }}
          containerStyle={{ maxWidth: 70, marginRight: 5 }}
          icon={
            <Icon
              name='person-pin-circle'
              type='material'
              size={sizes.Icon6}
              color={Colors.White.rgb}
            />
          }
        />
      }
      {isVirtual && 
        <Chip
          title='Virtual'
          titleStyle={Fonts.Label3}
          buttonStyle={{ backgroundColor: Colors.Blue4.rgb, padding: 5 }}
          containerStyle={{ maxWidth: 70 }}
          icon={
            <Icon
              name='wifi'
              type='material-community'
              size={sizes.Icon6}
              color={Colors.White.rgb}
            />
          }
        />
      }
    </View>
  )
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
