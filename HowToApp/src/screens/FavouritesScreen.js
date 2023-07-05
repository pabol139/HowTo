import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  SectionList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import HeaderOptions from '../components/HeaderOptions';
import realmContext from '../data/config/howto-realm';
import CustomText from '../components/CustomText';
import FavouriteOption from '../components/FavouriteOption';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import CustomModal from '../components/CustomModal';

import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
const {Popover} = renderers;
const {useQuery, useRealm} = realmContext;

const FavouritesScreen = ({navigation}) => {
  const realm = useRealm();
  const favourites = useQuery('Favorito');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [favouriteId, setFavouriteId] = useState('');

  const favouritesObject = [
    {
      title: 'Favoritos',
      data: favourites,
    },
  ];

  const changeModalVisible = bool => {
    setModalVisible(bool);
  };
  const changeModalContent = text => {
    setModalContent(text);
  };

  const showDeleteFavourite = id => {
    setFavouriteId(id);
    changeModalVisible(true);
  };

  const deleteFavourite = () => {
    const favouriteObject = favourites.filtered('_id == $0', favouriteId);
    realm.write(() => {
      realm.delete(favouriteObject);
    });
  };

  const showInfo = id => {
    const auxObject = favourites.filtered('_id == $0', id)[0];
    const favouriteObject = JSON.parse(JSON.stringify(auxObject));

    navigation.navigate('FavouriteScreen', {
      favouriteObject: favouriteObject,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOptions
        navigation={navigation}
        showBack={true}
        settings={true}
        goSearchScreen={true}></HeaderOptions>
      <SectionList
        sections={favouritesObject}
        className="mt-10 mb-10 px-6"
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <TouchableOpacity
            className="mt-5 mr-5 w-full h-[60px] flex-row items-center border border-[#B12BFF] bg-[#FAF1FF] rounded-full"
            onPress={() => showInfo(item._id)}
            onLongPress={() => showDeleteFavourite(item._id)}>
            <FavouriteOption>{item.title}</FavouriteOption>
          </TouchableOpacity>
        )}
        renderSectionHeader={({section: {title}}) => (
          <View className="flex-row">
            <CustomText
              weight={'semi-bold'}
              style={'text-2xl text-[#3F3F3F] mr-4'}>
              {title}
            </CustomText>

            <Menu
              renderer={Popover}
              rendererProps={{
                placement: 'right',
                anchorStyle: {backgroundColor: '#838383'},
              }}>
              <MenuTrigger>
                <FontIcon
                  name="question-circle"
                  color={'#3F3F3F'}
                  size={28}></FontIcon>
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  backgroundColor: '#838383',
                  width: 170,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 12,
                }}>
                <CustomText
                  weight={'bold'}
                  style={'text-white text-[12px] text-center p-2'}>
                  Los favoritos son accesibles incluso sin conexión a internet.
                  Los videos no estarán disponibles sin internet.
                </CustomText>
              </MenuOptions>
            </Menu>
          </View>
        )}></SectionList>

      <Modal transparent={true} animationType="fade" visible={modalVisible}>
        <CustomModal
          changeModalVisibility={changeModalVisible}
          changeModalContent={changeModalContent}
          type={'action'}
          deleteFavouriteHandler={deleteFavourite}
          content={'modalContent'}></CustomModal>
      </Modal>
    </SafeAreaView>
  );
};

export default FavouritesScreen;
