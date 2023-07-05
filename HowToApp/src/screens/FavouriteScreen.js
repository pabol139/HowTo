import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  ActivityIndicator,
  Modal,
} from 'react-native';
import HeaderOptions from '../components/HeaderOptions';
import CustomText from '../components/CustomText';
import YoutubePlayer from 'react-native-youtube-iframe';
import {SelectableText} from '@alentoma/react-native-selectable-text';
import {YOUTUBE_API_KEY} from '@env';
import openai from '../api/openai-config';
import realmContext from '../data/config/howto-realm';
const {RealmProvider, useQuery, useRealm, useObject} = realmContext;

import axios from 'axios';
import CustomModal from '../components/CustomModal';
import {Solucion} from '../data/models/howto-models';

const FavouriteScreen = ({route, navigation}) => {
  const {favouriteObject} = route.params;

  const realm = useRealm();
  const favourites = useQuery('Favorito');
  const [playing, setPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const title = favouriteObject.title;
  const description = favouriteObject.description;
  const videoId = favouriteObject.video_id;
  const tools = favouriteObject.tools;
  const steps = favouriteObject.steps;
  const tips = favouriteObject.tips;
  const definitions = favouriteObject.definitions;
  const indexContent = [
    'Descripción',
    'Video',
    'Lo que necesitas',
    'Pasos',
    'Consejos',
  ];

  const changeModalVisible = bool => {
    setModalVisible(bool);
  };
  const changeModalContent = text => {
    setModalContent(text);
  };

  const showDescriptionContent = text => {
    console.log('entro');
    setModalVisible(true);
    setModalContent(text);
  };

  const onStateChange = useCallback(state => {
    if (state === 'ended') setPlaying(false);
    if (state === 'playing') setPlaying(true);
    if (state === 'paused') setPlaying(false);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOptions
        navigation={navigation}
        showBack={true}
        settings={true}
        showDefinitions={true}
        definitions={definitions}
        definitionsHandler={showDescriptionContent}></HeaderOptions>
      <ScrollView overScrollMode="never" className="px-5 mt-5">
        <CustomText
          weight={'bold'}
          style={'text-center text-2xl mb-10 text-[#3F3F3F]'}>
          {title}
        </CustomText>
        <View className="flex-1 justify-start items-start border border-[#3282FD] bg-[#f0f6ff] rounded-xl mb-4">
          <View className="w-full py-2 items-start border-b-[1px] border-[#3282FD]">
            <CustomText
              weight={'bold'}
              style={'text-center text-xl px-5 text-[#001534]'}>
              Índice
            </CustomText>
          </View>
          <View className="px-5 pb-2 flex-1">
            {indexContent.map((text, i) => {
              return (
                <CustomText
                  style={'mt-2 text-base text-[#3F3F3F]'}
                  weight={'semi-bold'}
                  key={i}>{`${i + 1}. ${text}`}</CustomText>
              );
            })}
          </View>
        </View>
        <View className="flex-1 justify-start items-start  bg-[#F4F3F6] rounded-xl mb-4 ">
          <View className="w-full py-2 items-start border-b-[1px] border-[#C5C5C5]">
            <CustomText
              weight={'bold'}
              style={'text-center text-xl px-5 text-[#3F3F3F]'}>
              Descripcion
            </CustomText>
          </View>
          <CustomText
            weight={'semi-bold'}
            style={'text-[#3F3F3F] text-base px-5 py-2 text-justify'}>
            {description}
          </CustomText>
        </View>
        <View className="mb-4 rounded-xl overflow-hidden">
          {isLoading || !videoId ? (
            <View className="items-center h-20 justify-center">
              <ActivityIndicator size="large" color="#3282FD" />
            </View>
          ) : (
            <YoutubePlayer
              height={200}
              play={playing}
              videoId={videoId}
              onChangeState={onStateChange}
            />
          )}
        </View>
        <View className="flex-1 justify-start items-start  bg-[#F4F3F6] rounded-xl mb-4 ">
          <View className="w-full py-2 items-start border-b-[1px] border-[#C5C5C5]">
            <CustomText
              weight={'bold'}
              style={'text-center text-xl px-5 text-[#3F3F3F]'}>
              Lo que necesitas
            </CustomText>
          </View>
          <View className="px-5 pb-2 flex-1">
            {tools.map((text, i) => {
              return (
                <CustomText
                  key={i}
                  weight={'semi-bold'}
                  style={
                    'text-[#3F3F3F] text-base capitalize'
                  }>{`\u2022 ${text}`}</CustomText>
              );
            })}
          </View>
        </View>
        <View className="flex-1 ">
          {steps.map((text, i) => {
            return (
              <View
                key={i}
                className="bg-[#F4F3F6] rounded-xl mb-5 px-5 py-2 flex-row">
                <Text className="text-3xl mr-4 text-[#3F3F3F]">{i}</Text>
                <CustomText
                  weight={'semi-bold'}
                  style={'text-[#3F3F3F] text-base px-5'}>
                  {text}
                </CustomText>
              </View>
            );
          })}
        </View>
        <View className="flex-1 justify-start items-start  bg-[#F4F3F6] rounded-xl mb-4 ">
          <View className="w-full py-2 items-start border-b-[1px] border-[#C5C5C5]">
            <CustomText
              weight={'bold'}
              style={'text-center text-xl px-5 text-[#3F3F3F]'}>
              Consejos
            </CustomText>
          </View>
          <View className="px-5 pb-5 flex-1">
            {tips.map((text, i) => {
              return (
                <CustomText
                  key={i}
                  weight={'semi-bold'}
                  style={'text-[#3F3F3F] text-base mt-5'}>
                  {`\u2022 ${text}`}
                </CustomText>
              );
            })}
          </View>
        </View>

        <Modal transparent={true} animationType="fade" visible={modalVisible}>
          <CustomModal
            changeModalVisibility={changeModalVisible}
            changeModalContent={changeModalContent}
            type={'text'}
            content={modalContent}></CustomModal>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavouriteScreen;
