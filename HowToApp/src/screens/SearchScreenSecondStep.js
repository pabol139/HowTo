import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import HeaderOptions from '../components/HeaderOptions';
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

const SearchScreenSecondStep = ({route, navigation}) => {
  const {query, contextQuestions} = route.params;
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUserData] = React.useState({});

  const parsedQuestions = JSON.parse(contextQuestions);
  useEffect(() => {
    const newObject = {};
    for (let index = 0; index < parsedQuestions.length; index++) {
      const question = parsedQuestions[index];
      setDeepValue(newObject, '', question);
    }
    setUserData(newObject);
  }, []);

  function setDeepValue(obj, value, path) {
    if (typeof path === 'string') {
      var path = path.split('.');
    }

    if (path.length > 1) {
      var p = path.shift();
      if (obj[p] == null || typeof obj[p] !== 'object') {
        obj[p] = {};
      }
      setDeepValue(obj[p], value, path);
    } else {
      obj[path[0]] = value;
    }
  }

  const callOpenAI = async () => {
    const stringInfo = JSON.stringify(user);
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      max_tokens: 780,
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: `El usuario quiere hacer esto "${query.trim()}". Además, hay que tener en cuenta esta información adicional: [${stringInfo}]\nCon toda esta información, proporciona una descripción de al menos un párrafo de problema explicando la problemática en general, una frase para buscar un video en youtube, las herramientas o elementos que necesite el usuario sin numerar, los pasos detallados para resolverlo sin numerar con un máximo de 5 pasos y una lista de consejos sin numerar con un máximo de 5 consejos, todo en formato JSON y con este formato:\n{"descripcion":"","frase_youtube":"","herramientas":"["",""]","pasos": ["Arreglar la mesa...","Montar la ..."],"consejos":[]}`,
        },
      ],
    });
    return response;
  };

  const showFinalSolution = () => {
    setIsLoading(true);
    callOpenAI().then(response => {
      const solutionInfo = response.data.choices[0].message.content;
      const isJson = isJsonString(solutionInfo);
      setIsLoading(false);

      if (isJson) {
        navigation.navigate('SolutionScreen', {
          solutionInfo: solutionInfo,
          context: JSON.stringify(user),
        });
      } else {
        console.log('not a json');
      }
    });
    // navigation.navigate('SolutionScreen', {
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
    //   context: JSON.stringify(user),
    // });
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <HeaderOptions
        navigation={navigation}
        settings={true}
        showBack={true}></HeaderOptions>
      <View className="flex-1 mt-10 px-6">
        <CustomText
          weight={'bold'}
          style={'text-3xl text-[#3F3F3F] text-center mb-5'}>
          Por favor, proporcionanos estos datos adicionales
        </CustomText>
        <View className=" justify-center">
          {parsedQuestions.map((object, i) => {
            const property = Object.keys(user)[i];
            return (
              <View className="w-full" key={i}>
                <CustomText
                  weight={'bold'}
                  style={'text-lg text-[#3F3F3F] ml-6'}>
                  {object}
                </CustomText>
                <TextInput
                  placeholderTextColor={'#AEAEAE'}
                  style={{
                    height: 50,
                    margin: 20,
                    marginTop: 10,
                    backgroundColor: '#F4F3F6',
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 100,
                    fontFamily: 'Inter-Regular',
                    fontSize: 16,
                    color: '#3F3F3F',
                  }}
                  onChangeText={text => {
                    setUserData({...user, [property]: text});
                  }}
                  placeholder="Introduce la información adicional"
                  value={Object.values(user)[i]}
                />
              </View>
            );
          })}
        </View>
      </View>

      {isLoading ? (
        <View className="items-center h-[120px] justify-center">
          <ActivityIndicator size="large" color="#3282FD" />
        </View>
      ) : (
        <View className="flex-row gap-4 h-[150px] justify-center items-center">
          <View className="flex-1 items-center ">
            <TouchableOpacity onPress={() => showFinalSolution()}>
              <View className="w-[72px] h-[72px] items-center justify-center bg-[#3282FD] rounded-full">
                <IonIcon name="checkmark" color="#FFFFFF" size={48} />
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex-1 items-center">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SearchScreen');
              }}>
              <View className="w-[72px] h-[72px] items-center  justify-center border-2 border-[#F3530E] rounded-full">
                <IonIcon name="close" color="#F3530E" size={48} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default SearchScreenSecondStep;
