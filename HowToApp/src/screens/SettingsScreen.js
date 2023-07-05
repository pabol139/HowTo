import React from 'react';
import {SafeAreaView, View} from 'react-native';
import HeaderOptions from '../components/HeaderOptions';
import CustomText from '../components/CustomText';

const SettingsScreen = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOptions
        navigation={navigation}
        goSearchScreen={true}
        showBack={true}></HeaderOptions>
      <CustomText weight={'bold'} style={'text-2xl ml-5 mt-5 text-[#3F3F3F]'}>
        Información
      </CustomText>
      <View>
        <CustomText weight={'bold'} style={'text-xl ml-5 mt-5 text-[#3F3F3F]'}>
          Autor
        </CustomText>
        <CustomText weight={'semi-bold'} style={'text-lg ml-5 text-[#3F3F3F]'}>
          Pablo García Muñoz
        </CustomText>
      </View>
      <View>
        <CustomText weight={'bold'} style={'text-xl ml-5 mt-5 text-[#3F3F3F]'}>
          Creación
        </CustomText>
        <CustomText weight={'semi-bold'} style={'text-lg ml-5 text-[#3F3F3F]'}>
          Julio 2023
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
