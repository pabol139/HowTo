/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import realmConfig from './src/data/config/howto-realm';
import {Solucion} from './src/data/models/howto-models';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {Colors} from 'react-native/Libraries/NewAppScreen';

// Create a realm context
const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);
const birthday3 = new Date();

function TestComponent() {
  const realm = useRealm();
  const solutions = useQuery(Solucion.name);

  const addSolution = () => {
    realm.write(() => {
      realm.create('Solucion', {
        _id: new Realm.BSON.ObjectId(),
        query: 'test query',
        created_at: new Date(),
      });
    });
  };

  const deleteSolution = solutions => {
    realm.write(() => {
      realm.delete(solutions);
    });
  };

  //addSolution();
  console.log(realm.schema);
  //console.log(realm.objects('Favorito'));
  console.log(solutions);

  return <Text>Hola</Text>;
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  console.log(birthday3);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []);

  return (
    <RealmProvider>
      <SafeAreaView style={backgroundStyle}>
        <ScrollView>
          <Text className="text-4xl bg-blue-300 mt-10">Esto es una prueba</Text>
          <TestComponent />
        </ScrollView>
      </SafeAreaView>
    </RealmProvider>
  );
}

export default App;
