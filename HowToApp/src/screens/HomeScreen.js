import {React} from 'react';
import {SafeAreaView, SectionList, Image} from 'react-native';
import HeaderOptions from '../components/HeaderOptions';
import Solution from '../components/Solution';
import realmContext from '../data/config/howto-realm';
import CustomText from '../components/CustomText';
import {useNetInfo} from '@react-native-community/netinfo';

const {useQuery} = realmContext;

const HomeScreen = ({navigation}) => {
  const solutions = useQuery('Solucion');
  const netInfo = useNetInfo();

  const maxSolutions = 3;
  const mostRecentSolutions = solutions.sorted('created_at', true);
  const slicedSolutions = mostRecentSolutions.slice(0, maxSolutions);

  const recentOptions = [
    {
      title: 'Más recientes',
      data:
        netInfo.isConnected && netInfo.isInternetReachable
          ? slicedSolutions
          : [
              'No se pueden mostrar tus búsquedas más recientes porque no tienes conexión a internet.',
            ],
    },
  ];

  //deleteSolution(solutions);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOptions navigation={navigation} settings={true}></HeaderOptions>

      {solutions.length > 0 ? (
        <SectionList
          sections={recentOptions}
          className="mt-10 px-6"
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => {
            return netInfo.isConnected && netInfo.isInternetReachable ? (
              <Solution
                context={item.context}
                solutionId={item._id}
                navigation={navigation}>
                {item.query}
              </Solution>
            ) : (
              <CustomText
                weight={'bold'}
                style={'text-[#3F3F3F] text-[14px] text-center p-2 mt-6'}>
                {item}
              </CustomText>
            );
          }}
          renderSectionHeader={({section: {title}}) => (
            <CustomText weight={'semi-bold'} style={'text-2xl text-[#3F3F3F]'}>
              {title}
            </CustomText>
          )}></SectionList>
      ) : (
        <CustomText weight={'bold'} style={'text-2xl mt-24 mb-32 text-center'}>
          ¡Haz tu primera búsqueda!
        </CustomText>
      )}

      <Image
        source={require('../assets/images/home.png')}
        style={{
          height: '40%',
          width: '80%',
          marginLeft: 30,
          resizeMode: 'contain',
        }}></Image>
      {/* <TouchableOpacity onPress={() => addSolution()}>
        <Text>Añadir</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteSolutions()}>
        <Text>Borrar</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
