import React, { useRef, useEffect } from 'react';

import {
  StyleSheet,
} from 'react-native';
import { width } from '../../../../styles';
import MapView, { Marker } from 'react-native-maps';

export const EventMap = React.memo(({
  location,
  physicalInfo
}) => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef && markerRef.current && markerRef.current.showCallout) {
      markerRef.current.showCallout();
    }
  }, [location, physicalInfo]);

  return (
    <MapView
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        longitudeDelta: location.longitudeDelta,
        latitudeDelta: location.latitudeDelta
      }}
      style={styles.map}
    >
      <Marker
        ref={markerRef}
        title={location.name}
        description={physicalInfo}
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
      /> 
    </MapView>
  )
});

const styles = StyleSheet.create({
  map: {
    width: 'auto',
    height: width / 10 * 9
  }
});
