import React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CustomText from './CustomText';

const Option = ({children, number}) => {
  return (
    <View className="flex-row items-center ">
      <View className="w-[42px] h-[42px] ml-4 mr-4 bg-white border border-[#3CB584] rounded-full items-center justify-center">
        <CustomText weight={'bold'} style={'text-2xl text-[#3CB584]'}>
          {number}
        </CustomText>
      </View>

      <CustomText
        weight={'medium'}
        style={'text-sm  text-[#3F434A] max-w-[260px]'}>
        {children}
      </CustomText>
    </View>
  );
};

export default Option;
