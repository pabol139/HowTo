import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  Text,
  StatusBar,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../assets/images/test.png'),
    title: 'Buscador accesible',
    subtitle:
      'Pulsa el botón para buscar cualquier problema. El botón estará siempre visible y accesible desde cualquier ventana.',
  },
  {
    id: '2',
    image: require('../assets/images/test2.png'),
    title: 'Múltiples opciones',
    subtitle:
      'Una vez se introduzca el problema, aparecerán diferentes opciones a elegir como pregunta definitiva. Este proceso siempre podrá ser cancelado.',
  },
  {
    id: '3',
    image: require('../assets/images/test3.png'),
    title: 'Añade contexto',
    subtitle:
      'Tras elegir la pregunta, se te pedirá que proporciones más contexto para una respuesta más acertada.',
  },
  {
    id: '4',
    image: require('../assets/images/test4.png'),
    title: 'Aprende',
    subtitle:
      'Puedes seleccionar palabras que no entiendas dentro de la respuesta y poder ver su significado.',
  },
];

const Slide = ({item}) => {
  return (
    <View style={{alignItems: 'center', width}}>
      <Image
        className="mt-10"
        source={item.image}
        style={{
          height: '62%',
          width,
          resizeMode: 'contain',
        }}></Image>
      <View className="w-full text-center items-center h-full">
        <Text className="text-[#3F3F3F] text-2xl font-['Inter-Bold'] mt-5 mb-5">
          {item.title}
        </Text>
        <Text className="max-w-[75%] font-['Inter-Regular'] text-[#3F3F3F] text-center text-base overflow-visible">
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
};

const OnBoardingScreen = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef(null);
  const Footer = () => {
    return (
      <View className="justify-between px-5" style={{height: height * 0.16}}>
        <View className="flex-row justify-center">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`h-2 w-5 bg-[#D9D9D9] mx-1 transition-all rounded-full ${
                currentSlideIndex === index && 'bg-[#3282FD] w-10'
              } `}></View>
          ))}
        </View>
        <View className="mb-5">
          {currentSlideIndex === slides.length - 1 ? (
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.replace('Home');
                  AsyncStorage.setItem('isAppFirstLaunched', 'false');
                }}
                className="h-[50px] rounded-md bg-[#3282FD] items-center justify-center">
                <Text className="font-['Inter-Bold'] text-base text-white">
                  COMENZAR
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-row gap-4">
              <TouchableOpacity
                onPress={skipSlides}
                className="flex-1 h-[50px] rounded-md border-2 border-[#3282FD] items-center justify-center">
                <Text className="font-['Inter-Bold'] text-base text-[#3282FD]">
                  SALTAR
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={goNextSlide}
                className="flex-1 h-[50px] rounded-md bg-[#3282FD] items-center justify-center">
                <Text className="font-['Inter-Bold'] text-base text-white">
                  SIGUIENTE
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({offset});
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const skipSlides = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current?.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar className="bg-white"></StatusBar>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        data={slides}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item}) => <Slide item={item}></Slide>}></FlatList>
      <Footer></Footer>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;
