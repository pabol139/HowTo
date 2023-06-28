import React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';

const HeaderOptions = ({
  navigation,
  showBack,
  warning,
  favouriteOption,
  settings,
}) => {
  var alignment = 'justify-between';
  if (showBack && !warning && !favouriteOption && !settings)
    alignment = 'justify-start';
  else if (!showBack && !warning && !favouriteOption && settings)
    alignment = 'justify-end';

  const {goBack} = navigation;

  const goPreviousScreen = () => {
    goBack();
  };

  const goSettings = () => {
    navigation.push('Settings');
  };
  return (
    <SafeAreaView className={`flex-row w-full ${alignment}`}>
      {showBack && (
        <TouchableOpacity
          className="mt-5 ml-5 w-12 h-12 items-center justify-center bg-[#F4F3F6] rounded-full"
          onPress={() => goPreviousScreen()}>
          <FontIcon name="chevron-left" color="#3F434A" size={26}></FontIcon>
        </TouchableOpacity>
      )}
      {favouriteOption && (
        <View className="mt-5 ml-5 w-12 h-12 items-center justify-center bg-[#F4F3F6] rounded-full">
          <AntIcon name="staro" color="#3F434A" size={30}></AntIcon>
        </View>
      )}
      {warning && (
        <View className="mt-5 w-12 h-12 items-center justify-center flex-row">
          <IonIcon name="ios-warning" color="#F3530E" size={28}></IonIcon>
        </View>
      )}
      {settings && (
        <TouchableOpacity onPress={() => goSettings()}>
          <View className="mt-5 mr-5 w-12 h-12 items-center justify-center bg-[#F4F3F6] rounded-full">
            <IonIcon name="settings-sharp" color="#3F434A" size={30}></IonIcon>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default HeaderOptions;
