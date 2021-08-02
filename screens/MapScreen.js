import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useDispatch} from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import Map from '../components/Map';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import {setDestination, setOrigin} from '../slices/navSlice';

const MapScreen = () => {
  const navigation = useNavigation();
  const Stack = createStackNavigator();
  const dispatch = useDispatch();
  return (
    <View style={tw`bg-white`}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setOrigin(null));
          dispatch(setDestination(null));
          navigation.navigate('HomeScreen');
        }}
        style={tw`absolute top-5 left-5 bg-gray-100 z-50 p-3 rounded-full shadow-lg`}>
        <Icon name="home" />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator initialRouteName="NavigateCard">
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
