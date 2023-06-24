/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import realmContext from './src/data/config/howto-realm';
import {Solucion} from './src/data/models/howto-models';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigator from './src/navigation/BottomNavigator';
import {Appearance} from 'react-native';

const {RealmProvider} = realmContext;
const Stack = createNativeStackNavigator();

import {Platform, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

// Create a realm context

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
            <Stack.Screen name="Home" component={BottomNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </RealmProvider>
    )
  );
}

export default App;
