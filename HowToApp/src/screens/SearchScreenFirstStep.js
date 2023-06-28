import React from 'react';
import {
  SafeAreaView,
  View,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import HeaderOptions from '../components/HeaderOptions';
import Option from '../components/Option';
import CustomText from '../components/CustomText';
import IonIcon from 'react-native-vector-icons/Ionicons';
import openai from '../api/openai-config';

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const SearchScreenFirstStep = ({route, navigation}) => {
  const {questions} = route.params;
  const parsedQuestions = JSON.parse(questions);
  const [isLoading, setIsLoading] = React.useState(false);

  const recentOptions = [
    {
      title: '¿Es alguna de estas opciones lo que estás buscando?',
      data: parsedQuestions,
    },
  ];

  const callOpenAI = async text => {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      max_tokens: 256,
      messages: [
        {
          role: 'system',
          content: `El usuario introduce esta frase: "${text}"
          ¿Qué más filtros necesita el usuario para recibir una respuesta acertada?
          Por ejemplo, si el usuario dice "quiero arreglar mi nevera",
          le dirás ["Modelo", "Dimensiones", "Marca de la nevera"].
          Proporciona al usuario las palabras clave, mínimo 2 y un máximo de 3 y en este formato JSON: ["", "", ""].
          No digas nada más.
        `,
        },
      ],
    });
    return response;
  };

  const onSubmitNextStep = item => {
    setIsLoading(true);
    callOpenAI(item)
      .then(response => {
        const questions = response.data.choices[0].message.content;
        const isJson = isJsonString(questions);
        setIsLoading(false);

        console.log(response.data.choices[0].message.content);

        if (isJson) {
          navigation.navigate('SecondStep', {
            query: item,
            contextQuestions: questions,
          });
        } else {
          console.log('not a json');
        }
      })

      .catch(err => console.log(err));
    // navigation.navigate('SecondStep', {
    //   query: item,
    //   contextQuestions: '["Modelo de marca", "Marca", "Tipo"]',
    // });

    // console.log(response.data.choices[0].message.content);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOptions
        navigation={navigation}
        settings={true}
        showBack={true}></HeaderOptions>
      <SectionList
        sections={recentOptions}
        className="mt-10 px-6"
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => (
          <TouchableOpacity
            className="mt-6 w-full py-1 min-h-[60px] flex-row items-center border border-[#3CB584] bg-[#f4fffb] rounded-full"
            onPress={() => {
              onSubmitNextStep(item);
            }}>
            <Option number={index + 1}>{item}</Option>
          </TouchableOpacity>
        )}
        renderSectionHeader={({section: {title}}) => (
          <CustomText
            weight={'bold'}
            style={'text-3xl text-[#3F3F3F] text-center mt-3 mb-5'}>
            {title}
          </CustomText>
        )}></SectionList>

      <View className="flex-1 items-center">
        {isLoading ? (
          <View className="absolute items-center justify-center">
            <ActivityIndicator size="large" color="#3282FD" />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchScreen');
            }}>
            <View className="w-[72px] h-[72px] items-center bottom-10 justify-center border-2 border-[#F3530E] rounded-full">
              <IonIcon name="close" color="#F3530E" size={48} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreenFirstStep;
