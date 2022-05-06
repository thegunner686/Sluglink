import React, { useMemo } from 'react';

import { createOpenLink } from 'react-native-open-maps';
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

export const LocationTag = React.memo(({
  location,
  physicalInfo
}) => {

  const openLocationLink = useMemo(() => createOpenLink({
    latitude: location.latitude,
    longitude: location.longitude,
    query: location.name,
    queryPlaceId: location.place_id
  }), [location]);

  return (
    <View
      style={{
        marginBottom: 10,
        paddingLeft: 5,
        borderLeftWidth: 5,
        borderLeftColor: Colors.Red3.rgb,
      }}
    >
      <TouchableOpacity
        style={styles.row}
        onPress={openLocationLink}
      >
        <View style={{ flex: 1 }}>
          <Text style={Fonts.Graph2}>{location.name}</Text>
          <Text style={Fonts.Paragraph3}>{location.address}</Text>
          <Text style={Fonts.Paragraph4}>{physicalInfo}</Text>
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
