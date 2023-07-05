import React from 'react';
import {SafeAreaView, View, SectionList, TouchableOpacity} from 'react-native';
import HeaderOptions from '../components/HeaderOptions';
import realmContext from '../data/config/howto-realm';
import CustomText from '../components/CustomText';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import Solution from '../components/Solution';

import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

const {Popover} = renderers;
const {useQuery} = realmContext;
import {useNetInfo} from '@react-native-community/netinfo';

const HistoricScreen = ({navigation}) => {
  const netInfo = useNetInfo();

  const solutions = useQuery('Solucion').sorted('created_at', true);
  const solutionsObject = [
    {
      title: 'Historial',
      data:
        netInfo.isConnected && netInfo.isInternetReachable
          ? solutions
          : [
              'Tu dispositivo no tiene acceso a internet. Para utilizar el historial, es necesario estar conectado a internet.',
            ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOptions
        navigation={navigation}
        showBack={true}
        settings={true}
        goSearchScreen={true}></HeaderOptions>

      <SectionList
        sections={solutionsObject}
        className="mt-10 mb-10 px-6"
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => {
          return netInfo.isConnected && netInfo.isInternetReachable ? (
            <Solution
              context={item.context}
              solutionId={item._id}
              navigation={navigation}>
              {item.query}
            </Solution>
          ) : (
            <CustomText
              weight={'bold'}
              style={'text-[#3F3F3F] text-[14px] text-center p-2 mt-32'}>
              {item}
            </CustomText>
          );
        }}
        renderSectionHeader={({section: {title}}) => (
          <View className="flex-row">
            <CustomText
              weight={'semi-bold'}
              style={'text-2xl text-[#3F3F3F] mr-4'}>
              {title}
            </CustomText>

            <Menu
              renderer={Popover}
              rendererProps={{
                placement: 'right',
                anchorStyle: {backgroundColor: '#838383'},
              }}>
              <MenuTrigger>
                <FontIcon
                  name="question-circle"
                  color={'#3F3F3F'}
                  size={28}></FontIcon>
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  backgroundColor: '#838383',
                  width: 170,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 12,
                }}>
                <CustomText
                  weight={'bold'}
                  style={'text-white text-[12px] text-center p-2'}>
                  El historial es solo accesible mediante acceso a internet.{' '}
                </CustomText>
              </MenuOptions>
            </Menu>
          </View>
        )}></SectionList>
    </SafeAreaView>
  );
};

export default HistoricScreen;
