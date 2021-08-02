import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Icon as ElIcon} from 'react-native-elements';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import {selectTravelTimeInformation} from '../slices/navSlice';

const data = [
  {
    id: 'Uber-go',
    title: 'UberGo',
    multiplier: 9,
    image: 'https://links.papareact.com/3pn',
    capacity: 4,
  },

  {
    id: 'Uber-prime',
    title: 'Premier',
    multiplier: 12,
    image: 'https://links.papareact.com/5w8',
    capacity: 4,
  },
  {
    id: 'Uber-xl',
    title: 'UberXL',
    multiplier: 15,
    image: 'https://links.papareact.com/7pf',
    capacity: 3,
  },
  {
    id: 'Uber-sedan',
    title: 'Sedan',
    multiplier: 18,
    image: 'https://links.papareact.com/3pn',
    capacity: 4,
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const travelTimeInfo = useSelector(selectTravelTimeInformation);
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <SafeAreaView style={tw`bg-white h-full pb-2 flex-1`}>
      <View style={tw`flex-row`}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NavigateCard');
          }}>
          <ElIcon
            type="fontawesome"
            style={tw`p-3`}
            name="chevron-left"
            size={30}
          />
        </TouchableOpacity>
        <Text style={tw`text-center py-3 text-lg m-auto pr-12`}>
          Select a ride - {(travelTimeInfo?.distance.value / 1000).toFixed(2)}{' '}
          km
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item: {id, title, multiplier, image}, item}) => {
          return (
            <TouchableOpacity
              style={tw`flex-row justify-start items-center px-5 py-2 ${
                selectedCar?.id === id ? 'bg-gray-100' : ''
              }`}
              onPress={() => setSelectedCar(item)}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                  marginTop: -15,
                }}
                source={{uri: image}}
              />
              <View>
                <Text style={tw`text-lg font-semibold items-center`}>
                  {title}
                  {'  '}
                  {selectedCar?.id === id ? (
                    <>
                      <Icon name="user" size={14} />{' '}
                      <Text style={tw`text-sm`}>{item.capacity}</Text>
                    </>
                  ) : null}
                </Text>

                <Text>
                  {travelTimeInfo?.duration.text}{' '}
                  {selectedCar?.id === id ? 'dropoff' : ''}
                </Text>
              </View>
              <View style={tw`ml-auto items-end`}>
                <Text style={tw`text-xl `}>
                  ₹
                  {(
                    (travelTimeInfo?.distance.value * multiplier) /
                    1000
                  ).toFixed(2)}
                </Text>
                <Text
                  style={{color: 'gray', textDecorationLine: 'line-through'}}>
                  ₹
                  {(
                    (travelTimeInfo?.distance.value * multiplier * 2) /
                    1000
                  ).toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <View style={tw`px-5`}>
        <TouchableOpacity
          disabled={!selectedCar}
          style={[
            tw`py-3 flex-row ${!selectedCar ? 'bg-gray-200' : 'bg-black'}`,
            {
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Text style={tw`text-white text-center text-lg font-semibold`}>
            Book {selectedCar?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
