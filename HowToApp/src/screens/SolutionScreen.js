import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import HeaderOptions from '../components/HeaderOptions';
import CustomText from '../components/CustomText';
import YoutubePlayer from 'react-native-youtube-iframe';

import {YOUTUBE_API_KEY} from '@env';
import axios from 'axios';

const SolutionScreen = ({route, navigation}) => {
  const {solutionInfo} = route.params;
  const parsedSolutionInfo = JSON.parse(solutionInfo);
  const title = parsedSolutionInfo.frase_youtube;
  const description = parsedSolutionInfo.descripcion;
  const tools = parsedSolutionInfo.herramientas;
  const steps = parsedSolutionInfo.pasos;
  const tips = parsedSolutionInfo.consejos;
  const [videoId, setVideoId] = React.useState('');
  const [playing, setPlaying] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const indexContent = [
    'Descripción',
    'Video',
    'Lo que necesitas',
    'Pasos',
    'Consejos',
  ];

  useEffect(() => {
    videoSearch(YOUTUBE_API_KEY, title, 1);
  }, []);

  function videoSearch(key, search, maxResults) {
    const endpoint = 'https://www.googleapis.com/youtube/v3/search';
    const query = `${endpoint}?part=snippet&maxResults=${maxResults}&key=${key}&type=video&q=${search}`;
    setIsLoading(true);
    axios({
      method: 'get',
      url: query,
    })
      .then(response => {
        if (response.data.items[0])
          setVideoId(response.data.items[0].id.videoId);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
    console.log(query);
  }

  const onStateChange = useCallback(state => {
    if (state === 'ended') setPlaying(false);
    if (state === 'playing') setPlaying(true);
    if (state === 'paused') setPlaying(false);
  }, []);

  console.log(solutionInfo);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOptions
        navigation={navigation}
        favouriteOption={true}
        settings={true}
        warning={true}></HeaderOptions>
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
            style={' text-base text-justify px-5 py-2 text-[#3F3F3F]'}>
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
                  style={'mt-2 text-base text-[#3F3F3F]'}
                  weight={'semi-bold'}
                  key={i}>{`\u2022 ${text}`}</CustomText>
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
                  style={' text-base text-[#3F3F3F] px-3'}
                  weight={'semi-bold'}>
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
                  style={'mt-5 text-base text-[#3F3F3F]'}
                  weight={'semi-bold'}
                  key={i}>{`\u2022 ${text}`}</CustomText>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SolutionScreen;
