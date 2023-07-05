import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CustomText from './CustomText';
import openai from '../api/openai-config';

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const Solution = ({solutionId, context, children, navigation}) => {
  const callOpenAI = async query => {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      max_tokens: 780,
      temperature: 0.5,
      messages: [
        {
          role: 'system',
          content: `El usuario quiere hacer esto "${query.trim()}". Además, hay que tener en cuenta esta información adicional: [${context}]\nCon toda esta información, proporciona una descripción de al menos un párrafo de problema explicando la problemática en general, una frase para buscar un video en youtube, las herramientas o elementos que necesite el usuario sin numerar, los pasos detallados para resolverlo sin numerar con un máximo de 5 pasos y una lista de consejos sin numerar con un máximo de 5 consejos, todo en formato JSON y con este formato:\n{"descripcion":"","frase_youtube":"","herramientas":"["",""]","pasos": ["Arreglar la mesa...","Montar la ..."],"consejos":[]}`,
        },
      ],
    });
    return response;
  };

  const showInfo = () => {
    callOpenAI(children).then(response => {
      const solutionInfo = response.data.choices[0].message.content;
      const isJson = isJsonString(solutionInfo);

      if (isJson) {
        navigation.navigate('SolutionScreen', {
          existingId: solutionId,
          solutionInfo: solutionInfo,
        });
      } else {
        console.log('not a json');
      }
    });

    // navigation.navigate('SolutionScreen', {
    //   existingId: solutionId,
    //   solutionInfo: `{
    //     "descripcion":"El problema con la nevera Samsung modelo RB38C671DSA/EF es que no se enciende la luz. Esto puede deberse a un problema en el interruptor de la luz o a un fallo en la conexión eléctrica. En ambos casos, es necesario realizar una serie de pasos para solucionar el problema y restablecer el funcionamiento normal de la nevera.",
    //     "frase_youtube":"Cómo arreglar la luz de la nevera Samsung",
    //     "herramientas":["Destornillador", "multímetro"],
    //     "pasos": [
    //     "Desconecta la nevera de la corriente eléctrica.",
    //     "Retira la tapa del interruptor de la luz utilizando un destornillador.",
    //     "Comprueba la continuidad del interruptor con un multímetro. Si no hay continuidad, reemplázalo por uno nuevo.",
    //     "Verifica que los cables de conexión estén en buen estado y correctamente conectados.",
    //     "Vuelve a colocar la tapa del interruptor y conecta la nevera a la corriente eléctrica."
    //     ],
    //     "consejos":[
    //     "Antes de realizar cualquier reparación, asegúrate de desconectar la nevera de la corriente eléctrica para evitar posibles descargas eléctricas.",
    //     "Si no tienes experiencia en reparaciones eléctricas, es recomendable que consultes a un técnico especializado para evitar daños mayores.",
    //     "Utiliza un destornillador adecuado para evitar dañar los tornillos de la nevera.",
    //     "Ten cuidado al manipular los cables de conexión para evitar cortocircuitos.",
    //     "Si el problema persiste después de realizar estos pasos, es posible que haya un fallo en el sistema eléctrico de la nevera y sea necesario llamar a un técnico para su reparación."
    //     ]
    //     }`,
    // });
  };

  return (
    <TouchableOpacity
      onPress={() => showInfo()}
      className="mt-5 mr-5 w-full h-[60px] flex-row items-center border border-[#3282FD] bg-[#f0f6ff] rounded-full">
      <View className="w-[42px] h-[42px] ml-4 mr-4 bg-white border border-[#3282FD] rounded-full items-center justify-center">
        <IonIcon
          name="chatbox-ellipses-outline"
          color="#3282FD"
          size={22}></IonIcon>
      </View>

      <CustomText weight={'semi-bold'} style={'text-base text-[#3F434A] pr-20'}>
        {children}
      </CustomText>
    </TouchableOpacity>
  );
};

export default Solution;
