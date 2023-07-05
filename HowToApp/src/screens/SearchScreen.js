import React from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import HeaderOptions from '../components/HeaderOptions';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {useFocusEffect} from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CustomText from '../components/CustomText';
import openai from '../api/openai-config';
import {useNetInfo} from '@react-native-community/netinfo';

const SearchScreen = ({navigation}) => {
  const [text, onChangeText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const netInfo = useNetInfo();

  const callOpenAI = async () => {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      max_tokens: 256,
      temperature: 0.5,
      messages: [
        {
          role: 'system',
          content: `El usuario introduce esta frase: "${text}". Analiza el corpus de la frase que introduzca el usuario. Si es una palabra ofensiva:"Lenguaje ofensivo". En el caso de que no lo sea, proporciona varias acciones interpretando qué es lo que quiere preguntar el usuario.\nPor ejemplo, si el usuario dice "quiero arreglar mi nevera", tu sugeriras "Arreglar nevera" Mínimo 2 y un máximo de 3, ponlas en este formato y no digas nada más. Respondes solo en formato en este formato JSON: ["Arreglar nevera", "Reparar nevera"].
        `,
        },
      ],
    });
    return response;
  };
  const onSubmitNextStep = () => {
    if (text !== '') {
      // setIsLoading(true);
      // callOpenAI()
      //   .then(response => {
      //     const questions = response.data.choices[0].message.content;
      //     const parsedQuestions = JSON.parse(questions);
      //     setIsLoading(false);
      //     console.log(response.data.choices[0].message.content);
      //     if (parsedQuestions[0] === 'Lenguaje ofensivo')
      //       setError('Lenguaje ofensivo, introduce otro tipo de pregunta');
      //     else {
      //       onChangeText('');
      //       navigation.navigate('FirstStep', {questions: questions});
      //     }
      //   })
      //   .catch(err => console.log(err));
      navigation.navigate('FirstStep', {
        questions:
          '["Arreglar nevera","Reparar nevera","Consultar detalles de la nevera"]',
      });
    } else {
      setError('Por favor, introduce una pregunta');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOptions navigation={navigation} settings={true}></HeaderOptions>
      <View className="flex-1 justify-center items-center">
        <CustomText
          weight={'bold'}
          style={
            'text-4xl px-5 w-full mb-8 text-center mt-[-200] text-[#3F3F3F]'
          }>
          ¿Qué necesitas?
        </CustomText>
        {netInfo.isConnected && netInfo.isInternetReachable ? (
          <View className="flex-row w-full items-center relative">
            <View className="absolute left-8 z-10">
              <FontIcon name="search" color="gray" size={25} />
            </View>
            <TextInput
              placeholderTextColor={'#AEAEAE'}
              style={{
                height: 50,
                margin: 20,
                padding: 10,
                backgroundColor: '#F4F3F6',
                paddingLeft: 50,
                paddingRight: 50,
                borderRadius: 100,
                fontFamily: 'Inter-Regular',
                fontSize: 16,
                flex: 1,
                color: '#3F3F3F',
              }}
              onChangeText={onChangeText}
              placeholder="Quiero arreglar mi nevera..."
              value={text}
              autoFocus={true}
              onSubmitEditing={() => onSubmitNextStep()}
              onChange={() => {
                setError('');
              }}
            />
            {isLoading ? (
              <View className="absolute right-8">
                <ActivityIndicator size="large" color="#3282FD" />
              </View>
            ) : (
              <TouchableOpacity
                className="absolute right-6"
                onPress={() => onSubmitNextStep()}>
                <IonIcon name="arrow-up-circle" color="#3282FD" size={38} />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <CustomText
            weight={'semi-bold'}
            style={'text-[#F3530E] text-center px-4'}>
            Para utilizar el buscador, es necesario estar conectado a internet.
          </CustomText>
        )}
        <CustomText weight={'semi-bold'} style={'text-[#F3530E]'}>
          {error}
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
