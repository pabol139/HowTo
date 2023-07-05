import React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
const {Popover} = renderers;
import CustomText from './CustomText';

const HeaderOptions = ({
  navigation,
  showBack,
  warning,
  favouriteOption,
  settings,
  onChangeFavourite,
  isFavourite,
  showDefinitions,
  definitions,
  definitionsHandler,
  goSearchScreen,
}) => {
  var alignment = 'justify-between';
  if (showBack && !warning && !favouriteOption && !settings)
    alignment = 'justify-start';
  else if (!showBack && !warning && !favouriteOption && settings)
    alignment = 'justify-end';

  const {goBack} = navigation;

  const goPreviousScreen = () => {
    if (!goSearchScreen) {
      goBack();
    } else {
      navigation.navigate('SearchScreen');
    }
  };

  const goSettings = () => {
    navigation.push('Settings');
  };
  const changeFavourite = () => {
    onChangeFavourite(!isFavourite);
  };

  const showDefinitionDescription = description => {
    definitionsHandler(description);
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
      {favouriteOption &&
        (isFavourite ? (
          <TouchableOpacity
            onPress={() => changeFavourite()}
            className="mt-5 ml-5 w-12 h-12 items-center justify-center bg-[#F4F3F6] rounded-full">
            <AntIcon name="star" color="#B12BFF" size={30}></AntIcon>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => changeFavourite()}
            className="mt-5 ml-5 w-12 h-12 items-center justify-center bg-[#F4F3F6] rounded-full">
            <AntIcon name="staro" color="#3F434A" size={30}></AntIcon>
          </TouchableOpacity>
        ))}
      {warning && (
        <Menu
          renderer={Popover}
          rendererProps={{
            preferredPlacement: 'bottom',
            anchorStyle: {backgroundColor: '#F3530E'},
          }}>
          <MenuTrigger>
            <View className="mt-5 w-12 h-12 items-center justify-center flex-row">
              <IonIcon name="ios-warning" color="#F3530E" size={28}></IonIcon>
            </View>
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{
              backgroundColor: '#F3530E',
              width: 200,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              borderRadius: 12,
            }}>
            <CustomText weight={'bold'} style={'text-white text-center p-4'}>
              Respuesta generada mediante inteligencia artifical. Este proyecto
              tiene fines académicos y no se hace responsable de un resultado
              inesperado.
            </CustomText>
          </MenuOptions>
        </Menu>
      )}
      {showDefinitions && (
        <Menu renderer={Popover} rendererProps={{placement: 'bottom'}}>
          <MenuTrigger>
            <IonIcon
              name="book-outline"
              color="#3F434A"
              size={30}
              style={{marginTop: 30}}></IonIcon>
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{
              backgroundColor: '#F4F3F6',
              width: 200,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <CustomText
              weight={'semi-bold'}
              style={
                'text-xl text-[#3F3F3F] py-2 border-b border-[#C2C2C2] w-[200px] text-center'
              }>
              Definiciones
            </CustomText>

            {definitions.map((definition, i) => {
              const word = definition.split('|')[0];
              const description = definition.split('|')[1];

              return (
                <MenuOption
                  key={i}
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    justifyContent: 'center',
                    borderBottomWidth: 1,
                    borderColor: '#DBDBDB',
                  }}
                  onSelect={() => showDefinitionDescription(description)}>
                  <Text className="text-xl mr-2 text-[#3F3F3F]">{i + 1}.</Text>
                  <CustomText weight={'semi-bold'} style={'text-[#3F3F3F]'}>
                    {word}
                  </CustomText>
                </MenuOption>
              );
            })}
          </MenuOptions>
        </Menu>
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
