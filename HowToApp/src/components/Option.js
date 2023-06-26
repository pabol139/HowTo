import React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CustomText from './CustomText';

const Option = ({children}) => {
  return (
    <TouchableOpacity className="mt-5 mr-5 w-full h-[60px] flex-row items-center border border-[#3282FD] bg-[#f0f6ff] rounded-full">
      <View className="w-[42px] h-[42px] ml-4 mr-4 bg-white border border-[#3282FD] rounded-full items-center justify-center">
        <IonIcon
          name="chatbox-ellipses-outline"
          color="#3282FD"
          size={18}></IonIcon>
      </View>

      <CustomText weight={'medium'} style={'text-base text-[#3F434A]'}>
        {children}
      </CustomText>
    </TouchableOpacity>
  );
};

export default Option;
