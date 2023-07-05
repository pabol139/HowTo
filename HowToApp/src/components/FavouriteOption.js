import React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CustomText from './CustomText';

const FavouriteOption = ({children}) => {
  return (
    <>
      <View className="w-[42px] h-[42px] ml-4 mr-4 bg-white border border-[#B12BFF] rounded-full items-center justify-center">
        <IonIcon
          name="chatbox-ellipses-outline"
          color="#B12BFF"
          size={22}></IonIcon>
      </View>

      <CustomText weight={'semi-bold'} style={'text-base text-[#3F434A] pr-20'}>
        {children}
      </CustomText>
    </>
  );
};

export default FavouriteOption;
