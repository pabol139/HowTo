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
const {useQuery, useRealm, useObject} = realmContext;

import axios from 'axios';
import CustomModal from '../components/CustomModal';
import {Solucion} from '../data/models/howto-models';

const SolutionScreen = ({route, navigation}) => {
  const {solutionInfo, existingId, context} = route.params;

  const realm = useRealm();
  const solutions = useQuery('Solucion');
  const favourites = useQuery('Favorito');
  const [videoId, setVideoId] = useState('');
  const [solutionObject, setSolutionObject] = useState({});
  const [playing, setPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isFavourite, setIsFavourite] = useState(false);
  const [definitions, setDefinitions] = useState([]);

  const parsedSolutionInfo = JSON.parse(solutionInfo);

  var title = parsedSolutionInfo.frase_youtube;
  var description = parsedSolutionInfo.descripcion;
  var tools = parsedSolutionInfo.herramientas;
  var steps = parsedSolutionInfo.pasos;
  var tips = parsedSolutionInfo.consejos;

  const indexContent = [
    'Descripción',
    'Video',
    'Lo que necesitas',
    'Pasos',
    'Consejos',
  ];

  useEffect(() => {
    //videoSearch(YOUTUBE_API_KEY, title, 1);

    if (!existingId) {
      realm.write(() => {
        setSolutionObject(
          realm.create(Solucion.name, {
            _id: new Realm.BSON.ObjectId(),
            query: title,
            context: context,
            created_at: new Date(),
          }),
        );
      });
    } else {
      const solutionObject = solutions.filtered('_id == $0', existingId)[0];
      setSolutionObject(solutionObject);
    }

    setVideoId('hzvkDxx8INE');
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
  }

  const changeModalVisible = bool => {
    setModalVisible(bool);
  };
  const changeModalContent = text => {
    setModalContent(text);
  };

  const changeFavourite = bool => {
    if (bool) {
      realm.write(() => {
        realm.create('Favorito', {
          _id: new Realm.BSON.ObjectId(),
          solution_id: solutionObject,
          title: title,
          video_id: videoId,
          description: description,
          tools: tools,
          steps: steps,
          tips: tips,
          definitions: definitions,
          created_at: new Date(),
        });
        setIsFavourite(bool);
      });
    } else {
      const favouriteObject = favourites.filtered(
        'solution_id == $0',
        solutionObject,
      );
      realm.write(() => {
        realm.delete(favouriteObject);
      });
      setIsFavourite(bool);
    }
  };

  const onStateChange = useCallback(state => {
    if (state === 'ended') setPlaying(false);
    if (state === 'playing') setPlaying(true);
    if (state === 'paused') setPlaying(false);
  }, []);

  const getDefinition = async phrase => {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      max_tokens: 780,
      temperature: 0.5,
      messages: [
        {
          role: 'system',
          //content: `El usuario quiere hacer esto ${query}. Además, hay que tener en cuenta esta información adicional: [${user}].\nCon toda esta información, proporciona una descripción de al menos un párrafo de problema explicando la problemática en general, una frase para buscar un video en youtube, las herramientas o elementos que necesite el usuario sin numerar, los pasos detallados para resolverlo con un máximo de 5 pasos y una lista de consejos sin numerar con un máximo de 5 consejos, todo en formato JSON y con este formato:\n{"descripcion":"","frase_youtube":"","herramientas":"["",""]","pasos": ["paso","paso"],"consejos":[]}.`,
          content: `Da una breve explicación y definición de la siguiente frase: "${phrase.trim()}". No digas nada más.`,
        },
      ],
    });
    return response;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOptions
        navigation={navigation}
        favouriteOption={true}
        settings={true}
        warning={true}
        onChangeFavourite={changeFavourite}
        isFavourite={isFavourite}></HeaderOptions>
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
          <SelectableText
            menuItems={['Significado']}
            style={{
              fontSize: 15,
              color: '#3F3F3F',
              textAlign: 'justify',
              paddingHorizontal: 20,
              paddingVertical: 8,
              flex: 1,
              fontFamily: 'Inter-SemiBold',
            }}
            onSelection={({content}) => {
              changeModalVisible(true);
              getDefinition(content)
                .then(response => {
                  const definitionInfo =
                    response.data.choices[0].message.content;
                  const definitionObject = `${content}|${definitionInfo}`;
                  setDefinitions([...definitions, definitionObject]);
                  setModalContent(definitionInfo);
                })
                .catch(err => console.log(err));
            }}
            value={description}
          />
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
                <SelectableText
                  key={i}
                  menuItems={['Significado']}
                  style={{
                    fontSize: 16,
                    color: '#3F3F3F',
                    fontFamily: 'Inter-SemiBold',
                    flex: 1,
                    marginTop: 8,
                    textTransform: 'capitalize',
                  }}
                  onSelection={({content}) => {
                    changeModalVisible(true);
                    getDefinition(content)
                      .then(response => {
                        const definitionInfo =
                          response.data.choices[0].message.content;
                        const definitionObject = `${content}|${definitionInfo}`;
                        setDefinitions([...definitions, definitionObject]);
                        setModalContent(definitionInfo);
                      })
                      .catch(err => console.log(err));
                  }}
                  value={`\u2022 ${text}`}
                />
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
                <SelectableText
                  menuItems={['Significado']}
                  style={{
                    fontSize: 16,
                    color: '#3F3F3F',
                    paddingHorizontal: 12,
                    flex: 1,
                    fontFamily: 'Inter-SemiBold',
                  }}
                  onSelection={({content}) => {
                    changeModalVisible(true);
                    getDefinition(content)
                      .then(response => {
                        const definitionInfo =
                          response.data.choices[0].message.content;
                        const definitionObject = `${content}|${definitionInfo}`;
                        setDefinitions([...definitions, definitionObject]);
                        setModalContent(definitionInfo);
                      })
                      .catch(err => console.log(err));
                  }}
                  value={text}
                />
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
                <SelectableText
                  key={i}
                  menuItems={['Significado']}
                  style={{
                    fontSize: 16,
                    color: '#3F3F3F',
                    fontFamily: 'Inter-SemiBold',
                    flex: 1,
                    marginTop: 20,
                  }}
                  onSelection={({content}) => {
                    changeModalVisible(true);
                    getDefinition(content)
                      .then(response => {
                        const definitionInfo =
                          response.data.choices[0].message.content;
                        const definitionObject = `${content}|${definitionInfo}`;
                        setDefinitions([...definitions, definitionObject]);
                        setModalContent(definitionInfo);
                      })
                      .catch(err => console.log(err));
                  }}
                  value={`\u2022 ${text}`}
                />
              );
            })}
          </View>
        </View>
        {}

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

export default SolutionScreen;
