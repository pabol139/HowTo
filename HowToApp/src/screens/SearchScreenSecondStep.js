import React, {useEffect} from 'react';
import {View, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import HeaderOptions from '../components/HeaderOptions';
import CustomText from '../components/CustomText';
import IonIcon from 'react-native-vector-icons/Ionicons';

const SearchScreenSecondStep = ({route, navigation}) => {
  const {query, contextQuestions} = route.params;
  const parsedQuestions = JSON.parse(contextQuestions);
  const [user, setUserData] = React.useState({});

  useEffect(() => {
    const newObject = {};

    for (let index = 0; index < parsedQuestions.length; index++) {
      const question = parsedQuestions[index];
      console.log('entro');
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
  const showFinalSolution = () => {
    console.log(user);
    navigation.navigate('SolutionScreen', {
      query: query,
      contextQuestions: '["Modelo de marca", "Marca", "Tipo"]',
    });
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
    </ScrollView>
  );
};

export default SearchScreenSecondStep;
