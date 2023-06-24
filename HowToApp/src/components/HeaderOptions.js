import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontIcon from 'react-native-vector-icons/FontAwesome5';

const HeaderOptions = ({goBack, warning, favouriteOption}) => {
  goBack = true;
  warning = true;
  favouriteOption = false;
  return (
    <SafeAreaView className="flex-row w-full justify-between">
      {goBack && (
        <View className="mt-5 ml-5 w-12 h-12 items-center justify-center bg-[#F4F3F6] rounded-full">
          <FontIcon name="chevron-left" color="#3F434A" size={26}></FontIcon>
        </View>
      )}
      {warning && (
        <View className="mt-5 w-12 h-12 items-center justify-center flex-row">
          <IonIcon name="ios-warning" color="#F3530E" size={28}></IonIcon>
        </View>
      )}
      <View className="mt-5 mr-5 w-12 h-12 items-center justify-center bg-[#F4F3F6] rounded-full">
        <IonIcon name="settings-sharp" color="#3F434A" size={30}></IonIcon>
      </View>
    </SafeAreaView>
  );
};

export default HeaderOptions;
