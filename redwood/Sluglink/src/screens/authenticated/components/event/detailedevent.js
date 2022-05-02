import React, { useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {
  Icon
} from 'react-native-elements';
import { useOrganization } from '../../../../hooks';
import { Colors, Fonts, sizes, width, height, rgba } from '../../../../styles';
import { StretchList } from '../../profile/components';
import { FullGallery } from './components/fullgallery';
import { OrganizationTag } from './components/organizationtag';

/**
 * Can be used in both the preview (event creation)
 * and for viewing from feed screen
 */
export const DetailedEvent = React.memo(({
  navigation,
  event
}) => {
  const [organization] = useOrganization(event?.organizationId);

  const StretchListHeader = useMemo(() => {
    return (
      <FullGallery
        photos={event?.photos}
      />
    )
  }, [event?.photos, styles.stretchListHeader]);

  const StretchListBody = useMemo(() => {
    const goToOrganizationProfile = () => {
      navigation.navigate('ViewProfile', { uid: event?.organizationId })
    };
    return (
      <View style={styles.body}>
        <Text style={styles.title}>{event?.title}</Text>
        <Text style={Fonts.Paragraph5}>hosted by</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <OrganizationTag
            organization={organization}
            onPress={goToOrganizationProfile}
          />
          <View style={styles.datetimeContainer}>
            <Icon
              type='material-community'
              name='calendar'
              size={sizes.Icon5}
            />
            <Text> March 12</Text>
          </View>
          <View style={styles.datetimeContainer}>
            <Icon
              type='material-community'
              name='clock-outline'
              size={sizes.Icon5}
            />
            <Text> 6AM to 9PM</Text>
          </View>
        </View>
      </View>
    )
  }, [navigation, organization, event?.title, event?.organizationId]);

  const stretchListHeaderHeight = useMemo(() => Math.floor((width / height) * 100), [width, height]);

  return (
    <StretchList
      header={StretchListHeader}
      body={StretchListBody}
      headerSize={stretchListHeaderHeight}
    />
  )
});

const styles = StyleSheet.create({
  title: {
    ...Fonts.Graph1
  },
  body: {
    backgroundColor: Colors.White.rgb,
    padding: 10
  },
  datetimeContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})
