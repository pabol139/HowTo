import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import HistoricScreen from '../screens/HistoricScreen';
import SearchScreen from '../screens/SearchScreen';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#3282FD',
        tabBarInactiveTintColor: '#D1D1D1',
        tabBarStyle: [
          {
            display: 'flex',
            height: 55,
          },
          null,
        ],
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarItemStyle: [{display: 'none'}],
          tabBarIcon: ({focused, size, color}) => {
            return <AntIcon name="star" color="#3282FD" size={28}></AntIcon>;
          },
        }}></Tab.Screen>
      <Tab.Screen
        name="FavouritesScreen"
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return <AntIcon name="star" color={color} size={28}></AntIcon>;
          },
        }}></Tab.Screen>
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <View
                style={{elevation: 5}}
                className="h-[60px] w-[60px] items-center justify-center bg-[#3282FD] rounded-full bottom-4">
                <FontIcon name="search" color="white" size={32} />
              </View>
            );
          },
        }}></Tab.Screen>
      <Tab.Screen
        name="HistoricScreen"
        component={HistoricScreen}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return <FontIcon name="history" color={color} size={28}></FontIcon>;
          },
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomNavigator;
