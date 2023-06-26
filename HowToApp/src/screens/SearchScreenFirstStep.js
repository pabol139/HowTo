import React from 'react';
import {SafeAreaView, Text, View, SectionList} from 'react-native';
import HeaderOptions from '../components/HeaderOptions';

const recentOptions = [
  {
    title: '¿Es alguna de estas opciones lo que estás buscando?',
    data: ['uno', 'dos', 'tres'],
  },
];

const SearchScreenFirstStep = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOptions
        navigation={navigation}
        settings={true}
        goBack={true}></HeaderOptions>
      <SectionList
        sections={recentOptions}
        className="mt-10 px-6"
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Text>{item}</Text>}
        renderSectionHeader={({section: {title}}) => (
          <Text className="text-2xl text-[#3F3F3F]">{title}</Text>
        )}></SectionList>
    </SafeAreaView>
  );
};

export default SearchScreenFirstStep;
