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
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appearance} from 'react-native';

const Stack = createNativeStackNavigator();

import {Platform, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

// Create a realm context
const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

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

Appearance.getColorScheme();

function App() {
  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []);

  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  useEffect(() => {
    async function checkFirstLaunched() {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');

      if (appData === null) {
        setIsAppFirstLaunched(true);
      } else setIsAppFirstLaunched(false);
    }
    checkFirstLaunched();
  }, []);

  return (
    isAppFirstLaunched !== null && (
      <RealmProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {isAppFirstLaunched && (
              <Stack.Screen
                name="OnBoardingScreen"
                component={OnboardingScreen}
              />
            )}
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </RealmProvider>
    )
  );
}

export default App;
