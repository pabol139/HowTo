import {React, useEffect, useState} from 'react';
import {
  SafeAreaView,
  SectionList,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import HeaderOptions from '../components/HeaderOptions';
import Option from '../components/Option';
import realmContext from '../data/config/howto-realm';

const {RealmProvider, useQuery, useRealm} = realmContext;

//const solutions = useQuery('Solucion');

const HomeScreen = () => {
  const realm = useRealm();
  const solutions = useQuery('Solucion');
  const mostRecentSolutions = solutions.sorted('created_at', true);
  const slicedSolutions = mostRecentSolutions.slice(0, maxSolutions);

  const maxSolutions = 3;

  const recentOptions = [
    {
      title: 'Más recientes',
      data: slicedSolutions,
    },
  ];

  const addSolution = () => {
    realm.write(() => {
      realm.create('Solucion', {
        _id: new Realm.BSON.ObjectId(),
        query: 'test query',
        created_at: new Date(),
      });
    });
  };

  const deleteSolutions = () => {
    realm.write(() => {
      realm.delete(solutions);
    });
  };

  //deleteSolution(solutions);

  console.log(slicedSolutions);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOptions></HeaderOptions>
      <SectionList
        sections={recentOptions}
        className="mt-10 px-6"
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Option>{item.query}</Option>}
        renderSectionHeader={({section: {title}}) => (
          <Text className="text-2xl text-[#3F3F3F]">{title}</Text>
        )}></SectionList>
      <Image
        source={require('../assets/images/home.png')}
        style={{
          height: '40%',
          width: '80%',
          marginLeft: 30,
          resizeMode: 'contain',
        }}></Image>
      <TouchableOpacity onPress={() => addSolution()}>
        <Text>Añadir</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteSolutions()}>
        <Text>Borrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
