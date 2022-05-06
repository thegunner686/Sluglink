import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Linking,
  TouchableOpacity
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

  const formatDate = (date) => {
    let list = new Date(date).toDateString().split(/ /);
    return list[0] + ", " + list[1] + " " + list[2];
  }

  const formatTime = (date) => {
    if (!date) return "";
    let timePattern = new RegExp(/(\d+:\d+).*([A-Z].)/);
    match = timePattern.exec(new Date(date).toLocaleTimeString('en-US'));
    return match[1] + " " + match[2];
  }

  const openMaps = (location) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${location.latitude},${location.longitude}`;
    const label = location.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  }

  const StretchListBody = useMemo(() => {
    const goToOrganizationProfile = () => {
      navigation.navigate('ViewProfile', { uid: event?.organizationId })
    };
    return (
      <View>


        <View style={styles.headerBody}>
          <View style={styles.leftHeader} >
            <Text style={styles.title}>{event?.title}</Text>
            <Text style={Fonts.Paragraph5}>hosted by</Text>
            <OrganizationTag
              organization={organization}
              onPress={goToOrganizationProfile}
            />
          </View>

          <View style={styles.rightHeader}>
            {event?.isPhysical ?
              <TouchableOpacity style={{ flex: 1 }} onPress={() => openMaps(event.location)}>
                <View style={styles.datetimeContainer}>

                  <Icon
                    type='material-community'
                    name='map-marker-outline'
                    size={sizes.Icon5}
                    style={{ marginRight: 5 }}
                  />
                  <Text numberOfLines={1} ellipsizeMode="tail">{event?.location?.name}</Text>

                </View>
              </TouchableOpacity>
              : null
            }
            <View style={styles.datetimeContainer}>
              <Icon
                type='material-community'
                name='calendar'
                size={sizes.Icon5}
                style={{ marginRight: 5 }}
              />
              <Text>{formatDate(event.startDate)}</Text>
            </View>
            <View style={styles.datetimeContainer}>
              <Icon
                type='material-community'
                name='clock-outline'
                size={sizes.Icon5}
                style={{ marginRight: 5 }}
              />
              <Text>{formatTime(event.startDate)}</Text>
            </View>
          </View>
        </View >
        <View style={styles.textBody}>
          {event.isVirtual ?
            <View style={{ flexDirection: "row" }}>
              <Text style={Fonts.Paragraph1}>
                Join virtually here:
              </Text>
              <TouchableOpacity onPress={() => Linking.openURL(event.link)}>
                <Text style={[Fonts.Paragraph1, { marginLeft: 5, textDecorationLine: "underline" }]}>
                  {event.link}
                </Text>
              </TouchableOpacity>
            </View>
            : null
          }
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
    ...Fonts.SubHeader1
  },
  headerBody: {
    display: "flex",
    backgroundColor: Colors.White.rgb,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  datetimeContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    // justifyContent: "space-between"
  },
  leftHeader: {
    flex: .6
  },
  rightHeader: {
    width: "40%",
    display: "flex",
    flex: .4,
    alignItems: "flex-end"
  },
  textBody: {
    flex: 1,
    display: "flex",
  }
})
