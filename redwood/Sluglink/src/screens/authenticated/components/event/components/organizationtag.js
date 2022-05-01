import React, { useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  Image
} from 'react-native-elements';
import { Fonts, sizes } from '../../../../../styles';

export const OrganizationTag = React.memo(({
  organization,
  onPress
}) => {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
    >
      <Image
        source={{ uri: organization?.picture }}
        style={styles.picture}
      />
      <Text style={styles.name}> {organization?.name}</Text>
    </TouchableOpacity>
  )
});

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    flex: 1,
  },
  picture: {
    width: sizes.Icon4,
    height: sizes.Icon4,
    borderRadius: sizes.Icon2
  },
  name: {
    ...Fonts.Paragraph2,
  }
})
