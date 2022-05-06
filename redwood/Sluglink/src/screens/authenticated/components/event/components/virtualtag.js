import React, { useMemo, useCallback } from 'react';

import {
  StyleSheet,
  Linking,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import {
  Icon
} from 'react-native-elements';
import { Colors, Fonts, sizes } from '../../../../../styles';

export const VirtualTag = React.memo(({
  link,
  virtualInfo
}) => {

  const openVirtualLink = useCallback(async () => {
    const canOpen = await Linking.canOpenURL(link);
    if(canOpen) {
      await Linking.openURL(link);
    }
  }, [link]);

  return (
    <View
      style={{
        marginVertical: 10,
        paddingLeft: 5,
        borderLeftWidth: 5,
        borderLeftColor: Colors.Blue4.rgb,
      }}
    >
      <TouchableOpacity
        style={styles.row}
        onPress={openVirtualLink}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: Colors.SteelBlue.rgb, ...Fonts.Paragraph2}}>
            {link}
          </Text>
          {virtualInfo != null && <Text style={Fonts.Paragraph4}>{virtualInfo}</Text>}
        </View>
        <View>
          <Icon
            name='open-in-new'
            type='material-community'
            size={sizes.Icon4}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
