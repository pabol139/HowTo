import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import HeaderOptions from '../components/HeaderOptions';

const FavouritesScreen = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1">
      <HeaderOptions
        navigation={navigation}
        showBack={true}
        settings={true}></HeaderOptions>
      <Text>FAVORITOS</Text>
    </SafeAreaView>
  );
};

export default FavouritesScreen;
