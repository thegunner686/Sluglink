import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  Divider,
  Icon
} from 'react-native-elements';
import { useOrganization } from '../../../../hooks';
import { Colors, Fonts, sizes, width, height, rgba } from '../../../../styles';
import { getDayWithEnding, getMonthName, getNumeralDate, getNumeralDateAndTime, getNumeralTime, getWeekdayName, toAMPMTime } from '../../../../utils';
import { StretchList } from '../../profile/components';
import { FullGallery } from './components/fullgallery';
import { LocationTag } from './components/locationtag';
import { VirtualTag } from './components/virtualtag';
import { OrganizationTag } from './components/organizationtag';
import { EventChips } from './eventchips';
import { EventMap } from './eventmap';

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


  const chipDisplay = useMemo(() => {
    return <EventChips
              isPhysical={event?.isPhysical || false}
              isVirtual={event?.isVirtual || false}
            />
  }, [event?.isVirtual, event?.isPhysical]);

  const descriptionDisplay = useMemo(() => {
    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={Fonts.Paragraph4}>{event?.description}</Text>
      </View>
    )
  }, [event?.description]);

  const dateDisplay = useMemo(() => {
    const startDate = new Date(event?.startDate);
    const endDate = new Date(event?.endDate);
    const isSameDay = getNumeralDate(startDate) == getNumeralDate(endDate);
    const isSameTime = getNumeralTime(startDate) == getNumeralTime(endDate);
    return (
      <View style={styles.datetimeContainer}>
        <View style={styles.row}>
          <Icon 
            name='calendar'
            type='material-community'
            size={sizes.Icon5}
          />
          <Text style={Fonts.Paragraph3}>{` ${getWeekdayName(startDate)}, ${getMonthName(startDate)} ${getDayWithEnding(startDate)}`}</Text>
          {!isSameDay ?
            <Text style={Fonts.Paragraph3}>{` to ${getWeekdayName(endDate)}, ${getMonthName(endDate)} ${getDayWithEnding(endDate)}`}</Text>
            : null
          }
        </View>
        <View style={styles.row}>
            <Icon 
              name='clock'
              type='material-community'
              size={sizes.Icon5}
            />
            <Text style={Fonts.Paragraph3}>{` ${getNumeralTime(startDate)}`}</Text>
            {!isSameTime ?
              <Text style={Fonts.Paragraph3}>{` to ${getNumeralTime(endDate)}`}</Text>
              : null
            }
        </View>
      </View>
    );
  }, [event?.startDate, event?.endDate]);

  const StretchListBody = useMemo(() => {
    const goToOrganizationProfile = () => {
      navigation.navigate('ViewProfile', { uid: event?.organizationId })
    };

    const createdAt = event?.createdAt?.toDate();

    return (
      <View style={styles.body}>
        <Text style={styles.title}>{event?.title}</Text>
        <Text style={{textAlign: 'center', ...Fonts.Label4}}>Hosted by</Text>
        <View style={styles.centeredRow}>
          <OrganizationTag
            organization={organization}
            onPress={goToOrganizationProfile}
          />
        </View>
        <Divider />
        {dateDisplay}
        {chipDisplay}
        {descriptionDisplay}
        {event?.isVirtual && event?.link ? 
          <VirtualTag link={event.link} virtualInfo={event.virtualInfo} />
          : null
        }
        {event?.location != null && event?.physicalInfo ? 
          <>
            <LocationTag location={event?.location} physicalInfo={event?.physicalInfo} />
            <EventMap location={event?.location} physicalInfo={event?.physicalInfo} />
          </>
          : null
        }
        {createdAt != null ? 
          <Text style={{
            ...Fonts.Paragraph5,
            color: Colors.Grey5.rgb,
            marginTop: 10,
          }}>
            Posted {getNumeralDateAndTime(createdAt)}
          </Text>
          : null
        }
      </View>
    )
  }, [
    navigation, 
    organization, 
    event?.title, 
    event?.organizationId, 
    event?.createdAt,
    chipDisplay, 
    dateDisplay,
    descriptionDisplay,
  ]);

  const stretchListHeaderHeight = useMemo(() => Math.floor((width / height) * 100), [width, height]);

  return (
    event?.photos?.length > 0 ?
      <StretchList
        header={StretchListHeader}
        body={StretchListBody}
        headerSize={stretchListHeaderHeight}
      />
      :
      <View style={styles.noPhotosBody}>
        {StretchListBody}
      </View>
  )
});

const styles = StyleSheet.create({
  title: {
    ...Fonts.Graph1,
    flex: 1,
    textAlign: 'center'
  },
  headerBody: {
    display: "flex",
    backgroundColor: Colors.White.rgb,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  datetimeContainer: {
    flexDirection: 'column',
    flex: 1,
    marginVertical: 10,
  },
  centeredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  noPhotosBody: {
    flex: 1,
    backgroundColor: Colors.White.rgb,
    padding: 10,
  }
})
