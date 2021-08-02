import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import {useSelector} from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import {selectOrigin} from '../slices/navSlice';
import NavFavourites from './NavFavourites';

const data = [
  {
    id: '123',
    title: 'Get a ride',
    image: 'car',
    screen: 'MapScreen',
    marginLeft: 'auto',
    description: 'Book a ride to your destination.',
  },
  {
    id: '456',
    title: 'Order food',
    image: 'fast-food',
    screen: 'EatsScreen',
    marginLeft: 8,
    description: 'Feelin hungry? Order some food!',
  },
];

const NavOptions = ({onNavigate = f => f}) => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  return (
    <>
      {data.map(item => (
        <TouchableOpacity
          key={item.id}
          style={[tw`flex-row items-center p-3 pl-2 mt-2`]}
          onPress={() => {
            if (origin && item.id === '123') {
              onNavigate();
              navigation.navigate(item.screen);
            }
          }}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-200 p-3`}
            name={item.image}
            type="ionicon"
            color={!origin ? '#999999' : '#000'}
            size={18}
          />
          <View>
            <Text
              style={[
                tw`font-semibold text-lg`,
                {color: !origin ? '#999999' : '#000'},
              ]}>
              {item.title}
            </Text>
            <Text
              style={[
                tw`text-gray-500`,
                {color: !origin ? '#999999' : '#000'},
              ]}>
              {item.description}
            </Text>
            <Divider
              style={{
                top: 18,
                width: 400,
                left: -5,
              }}
            />
          </View>
          <View style={tw`ml-auto items-end`}>
            <Icon
              color={!origin ? '#999999' : '#000'}
              name="arrowright"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default NavOptions;
