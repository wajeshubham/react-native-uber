import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {useDispatch, useSelector} from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import {GOOGLE_MAPS_KEY} from '@env';

import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from '../slices/navSlice';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  const getTravelTime = async () => {
    const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin?.location.lat},${origin?.location.lng}&destinations=${destination?.location.lat},${destination?.location.lng}&key=${GOOGLE_MAPS_KEY}`;
    const response = await fetch(URL);
    const data = await response.json();
    dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
  };

  useEffect(() => {
    if (!origin || !destination) return;

    setTimeout(() => {
      mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: {
          top: 45,
          right: 45,
          bottom: 45,
          left: 45,
        },
      });
    }, 200);
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    getTravelTime();
  }, [origin, destination]);

  return (
    <MapView
      ref={mapRef}
      style={{flexGrow: 1, backgroundColor: 'grey'}}
      mapType="standard"
      showsUserLocation={false}
      zoomEnabled={true}
      showsCompass={false}
      zoomControlEnabled={false}
      initialRegion={{
        latitude: origin?.location.lat || 73.99,
        longitude: origin?.location.lng || 66.99,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}>
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor="black"
          strokeWidth={3}
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin?.location.lat,
            longitude: origin?.location.lng,
          }}
          title="Origin"
          description={origin?.description}
          identifier="origin"
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination?.location.lat,
            longitude: destination?.location.lng,
          }}
          title="Destination"
          description={destination?.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
