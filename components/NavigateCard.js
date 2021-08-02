import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import {
  selectDestination,
  selectOrigin,
  setDestination,
  setOrigin,
} from '../slices/navSlice';
import NavFavourites from './NavFavourites';
import {GOOGLE_MAPS_KEY} from '@env';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const navigation = useNavigation();
  const gInput = useRef(null);

  useEffect(() => {
    return () => {
      dispatch(setOrigin(null));
      dispatch(setDestination(null));
    };
  }, []);

  return (
    <SafeAreaView style={tw`bg-white`}>
      {/* <Text style={tw`pl-2 py-4 text-xl`}>{origin?.description}</Text> */}
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View style={tw`px-4`}>
          <GooglePlacesAutocomplete
            placeholder={origin?.description}
            styles={{
              container: {
                flex: 0,
                top: 15,
                width: '100%',
                zIndex: 10,
                marginBottom: 10,
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
              placeholderTextColor: '#000000',
            }}
          />

          <GooglePlacesAutocomplete
            ref={gInput}
            placeholder="Where to?"
            minLength={2}
            styles={{
              container: {
                flex: 0,
                top: 15,
                width: '100%',
                zIndex: 10,
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
              placeholderTextColor: '#aaaaaa',
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={0}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                }),
              );
            }}
            fetchDetails={true}
            query={{
              key: GOOGLE_MAPS_KEY,
              language: 'en',
            }}
            onFail={e => {
              console.log(e, 'eeeeeee');
            }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(setDestination(null));
                gInput.current?.setAddressText('');
              }}
              style={{position: 'absolute', top: 14, right: 10}}>
              <Icon type="ionicon" name="close-circle" size={18} />
            </TouchableOpacity>
          </GooglePlacesAutocomplete>
        </View>
        <View style={tw`px-2 mt-2`}>
          <NavFavourites />
        </View>
        <View style={tw`px-4 mt-4`}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RideOptionsCard');
            }}
            disabled={!destination}
            style={[
              tw`py-3 flex-row`,
              {
                backgroundColor: !destination ? 'gray' : 'black',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Icon
              type="font-awesome"
              name="car"
              size={16}
              color="white"
              style={tw`mr-2`}
            />
            <Text style={tw`text-white text-center text-lg font-semibold`}>
              Book a ride
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`py-3 flex-row mt-2`,
              {
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Icon
              type="ionicon"
              name="fast-food"
              size={16}
              color="white"
              style={tw`mr-2`}
            />
            <Text style={tw`text-white text-center text-lg font-semibold`}>
              Eats
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({});
