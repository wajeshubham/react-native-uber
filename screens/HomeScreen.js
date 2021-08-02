import React, {useEffect, useRef} from 'react';
import {
  Image,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useDispatch} from 'react-redux';
import {setOrigin, setDestination} from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';
import Map from '../components/Map';
import {ScrollView} from 'react-native-gesture-handler';
import {GOOGLE_MAPS_KEY} from '@env';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import Geolocation from 'react-native-geolocation-service';

navigator.geolocation = require('react-native-geolocation-service');

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const gInput = useRef(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Uber',
          message: 'Allow us you use your location.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    try {
      Geolocation.getCurrentPosition(
        position => {},
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
      );
    } catch (e) {
      requestLocationPermission();
    }
  }, []);

  return (
    <SafeAreaView style={tw`bg-gray-200 h-full`}>
      <View style={[tw`bg-gray-200`, {height: '55%', zIndex: -1}]}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
            position: 'absolute',
            zIndex: 10,
            left: 15,
          }}
          source={{
            uri: 'https://links.papareact.com/gzs',
          }}
        />
        {[...Array(100)].map((a, i) => (
          <Divider
            key={`${a}_${i}`}
            style={[
              tw`my-1 -ml-60 w-full`,
              {transform: [{rotateZ: '45deg'}], width: 1300},
            ]}
            color="#d0d0d0"
          />
        ))}
      </View>
      <View
        style={[
          tw`px-4 pt-4 pb-0 bg-white`,
          {borderTopLeftRadius: 10, borderTopRightRadius: 10},
        ]}>
        <GooglePlacesAutocomplete
          ref={gInput}
          placeholder="Enter pickup point"
          minLength={2}
          disableScroll={false}
          styles={{
            container: {
              flex: 0,
              width: '100%',
              borderColor: '#E5E7EB',
              borderWidth: 1,
              backgroundColor: '#E5E7EB',
            },
            textInput: {
              fontSize: 15,
              color: 'black',
              backgroundColor: '#E5E7EB',
              borderRadius: 0,
            },
          }}
          enablePoweredByContainer={false}
          textInputProps={{
            placeholderTextColor: '#555555',
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={0}
          onPress={(data, details = null) => {
            if (data?.geometry) {
              dispatch(
                setOrigin({
                  location: data?.geometry.location,
                  description: data.name,
                }),
              );
              dispatch(setDestination(null));
              return;
            }
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              }),
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: 'en',
          }}
          onFail={e => {
            console.log(e, 'eeeeeee');
          }}
          currentLocation={false}
          currentLocationLabel={`Current location`}>
          <TouchableOpacity
            onPress={() => {
              dispatch(setOrigin(null));
              gInput.current?.setAddressText('');
            }}
            style={{position: 'absolute', top: 14, right: 10}}>
            <Icon type="ionicon" name="close-circle" size={18} />
          </TouchableOpacity>
        </GooglePlacesAutocomplete>
      </View>
      <ScrollView style={tw`h-1/2 px-4 bg-white`}>
        <NavOptions
          onNavigate={() => {
            gInput.current?.setAddressText('');
          }}
        />
        <NavFavourites />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
