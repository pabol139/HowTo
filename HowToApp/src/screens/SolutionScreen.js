import React from 'react';
import {SafeAreaView, Text, ScrollView} from 'react-native';
import HeaderOptions from '../components/HeaderOptions';

const SolutionScreen = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOptions
        navigation={navigation}
        favouriteOption={true}
        settings={true}
        warning={true}></HeaderOptions>
      <ScrollView>
        <Text className="text-3xl">
          llorem lorem llorem lorem llorem lorem llorem lorem llorem lorem
          llorem lorem llorem lorem llorem lorem llorem lorem llorem lorem
          llorem lorem llorem lorem llorem lorem llorem lorem llorem lorem
          llorem lorem llorem lorem llorem lorem llorem lorem llorem lorem
          llorem lorem llorem lorem llorem lorem llorem lorem llorem lorem
          llorem lorem llorem lorem llorem lorem llorem lorem llorem lorem
          llorem lorem llorem lorem llorem lorem llorem lorem llorem lorem
          llorem lorem llorem lorem llorem lorem llorem lorem llorem lorem
          llorem lorem llorem lorem llorem lorem llorem lorem llorem lorem
          llorem lorem llorem lorem llorem lorem llorem lorem llorem lorem
          llorem lorem llorem lorem llorem lorem llorem lorem llorem lorem
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SolutionScreen;
