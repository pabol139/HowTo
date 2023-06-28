import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import HeaderOptions from '../components/HeaderOptions';

const SettingsScreen = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1">
      <HeaderOptions navigation={navigation} showBack={true}></HeaderOptions>
      <Text>SETTINGS</Text>
    </SafeAreaView>
  );
};

export default SettingsScreen;
