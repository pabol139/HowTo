import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import HeaderOptions from '../components/HeaderOptions';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CustomText from '../components/CustomText';
import {OPENAI_API_KEY} from '@env';

const {width, height} = Dimensions.get('window');

const SearchScreen = ({navigation}) => {
  const [text, onChangeText] = React.useState('');
  console.log(OPENAI_API_KEY);
  const onSubmitNextStep = () => {
    console.log('hola');
    navigation.push('FirstStep');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOptions settings={true}></HeaderOptions>
      <View className="flex-1 justify-center items-center">
        <CustomText
          weight={'bold'}
          style={'text-4xl px-5 w-full mb-8 text-center mt-[-100]'}>
          ¿Qué quieres resolver?
        </CustomText>

        <View className="flex-row w-full items-center relative">
          <View className="absolute left-8 z-10">
            <FontIcon name="search" color="gray" size={25} />
          </View>
          <TextInput
            style={{
              height: 50,
              margin: 20,
              padding: 10,
              backgroundColor: '#F4F3F6',
              paddingLeft: 50,
              borderRadius: 20,
              fontFamily: 'Inter-Regular',
              flex: 1,
            }}
            onChangeText={onChangeText}
            placeholder="Quiero arreglar mi nevera..."
            value={text}
            autoFocus={true}
            onSubmitEditing={() => onSubmitNextStep()}
          />
          <TouchableOpacity
            className="absolute right-8"
            onPress={() => onSubmitNextStep()}>
            <IonIcon name="arrow-up-circle" color="#3282FD" size={38} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
