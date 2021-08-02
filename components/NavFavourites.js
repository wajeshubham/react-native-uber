import React from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import tw from 'tailwind-react-native-classnames';

const NavFavourites = () => {
  const data = [
    {
      id: '123',
      location: 'Home',
      icon: 'home',
      destination: 'Mumbai, Maharashtra, India',
    },
    {
      id: '543',
      location: 'Work',
      icon: 'briefcase',
      destination: 'London Eye, London, UK',
    },
  ];
  return data.map((item, i) => (
    <TouchableOpacity
      key={item.id}
      style={[tw`flex-row items-center p-3 pl-2 mt-2`]}>
      <Icon
        style={tw`mr-4 rounded-full bg-gray-200 p-3`}
        name={item.icon}
        type="ionicon"
        color={'black'}
        size={18}
      />
      <View>
        <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
        <Text style={tw`text-gray-500`}>{item.destination}</Text>
        <Divider
          style={{
            top: 18,
            width: 400,
            left: -5,
            display: i === 1 ? 'none' : 'flex',
          }}
        />
      </View>
    </TouchableOpacity>
  ));
};

export default NavFavourites;

const styles = StyleSheet.create({});
