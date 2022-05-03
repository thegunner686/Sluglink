import React, {
  useState,
  useRef,
  useEffect,
  useCallback
} from 'react';

import {
  Icon,
  Button,
} from 'react-native-elements';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { Colors, Fonts, sizes, width, height, Shadow } from '../../../../../styles';
import { BackButton } from '../../../profile/components';
import { LocationSearch } from './locationsearch';
import { useNewEvent } from './neweventstore';

const UCSC_REGION = {
  latitude: 36.99545802344773,
  latitudeDelta: 0.03042570902234587,
  longitude: -122.05870028127644,
  longitudeDelta: 0.019896329980312544,
};

const Pin = () => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <Icon
        name='location-pin'
        color={Colors.Red3.rgb}
        size={sizes.Icon3}
        containerStyle={{
          width: sizes.Icon3,
          height: sizes.Icon3,
          position: 'absolute',
          left: width / 2 - sizes.Icon3 / 2,
          top: (height) / 2 - sizes.Icon3 - insets.top + 5
        }}
      />
    </>
  )
};

export const EditPhysicalEventScreen = ({ navigation }) => {
  const mapRef = useRef(null);
  const [newEvent, setNewEvent] = useNewEvent(state => [state.newEvent, state.setNewEvent]);
  const [location, setLocation] = useState(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (newEvent.location) setLocation(newEvent.location);
  }, [newEvent]);

  const handleLocationChange = (search_result, place) => {
    const { location } = place.result.geometry;
    let toRegion = {
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    };
    setLocation({
      ...toRegion,
      address: place.result.formatted_address,
      name: place.result.name,
      description: search_result.description,
      place_id: search_result.place_id
    });
    setAnimating(true);
    mapRef.current?.animateToRegion(toRegion, 1000);
    setTimeout(() => setAnimating(false), 1000);
  };

  const handleRegionChange = useCallback((region) => {
    if (animating) return;
    if (location?.name == null || location?.address == null) return;
    setLocation(loc => ({
      ...loc,
      ...region
    }));
  }, [animating, location]);

  const handleSetLocation = useCallback(() => {
    setNewEvent({
      location,
    });
    navigation.goBack();
  }, [location]);

  return (
    <>
      <MapView
        ref={mapRef}
        userLocationPriority='passive'
        showUserLocation={true}
        showsBuildings={true}
        showsPointsOfInterest={true}
        onRegionChange={handleRegionChange}
        initialRegion={UCSC_REGION}
        style={{ flex: 1 }}
      />
      <LocationSearch
        location={location}
        onChange={handleLocationChange}
      />
      <BackButton
        onPress={navigation.goBack}
        icon='chevron-left'
      />
      <Pin />
      <Button
        onPress={handleSetLocation}
        title='Set Location'
        type='solid'
        containerStyle={{
          position: 'absolute',
          alignSelf: 'center',
          bottom: height / 5,
        }}
        buttonStyle={{
          backgroundColor: Colors.Red4.rgb,
          width: width / 10 * 8,
        }}
        titleStyle={Fonts.Paragraph2}
      />
    </>
  )
};
