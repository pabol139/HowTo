import React from 'react';
import {TouchableOpacity, View, ActivityIndicator} from 'react-native';
import CustomText from './CustomText';
import IonIcon from 'react-native-vector-icons/Ionicons';

const CustomModal = ({
  content,
  type,
  changeModalContent,
  changeModalVisibility,
  deleteFavouriteHandler,
}) => {
  const closeModal = () => {
    changeModalVisibility(false);
    changeModalContent('');
  };

  const deleteFavourite = () => {
    deleteFavouriteHandler();
    closeModal();
  };

  return (
    <TouchableOpacity
      disabled={true}
      className="flex-1 items-center justify-center bg-[#1717179e]">
      <TouchableOpacity onPress={() => closeModal()}>
        <View className="w-[72px] h-[72px] bg-white items-center bottom-10 justify-center border-2 border-[#F3530E] rounded-full ">
          <IonIcon name="close" color="#F3530E" size={48} />
        </View>
      </TouchableOpacity>

      <View className="bg-white py-3 px-4 w-[300px] rounded-2xl">
        {!content ? (
          <View className="items-center h-[120px] justify-center">
            <ActivityIndicator size="large" color="#3282FD" />
          </View>
        ) : type === 'text' ? (
          <CustomText weight={'medium'} style={'text-center text-[#3F3F3F]'}>
            {content}
          </CustomText>
        ) : (
          <View className="py-4">
            <CustomText
              weight={'bold'}
              style={'text-center text-[#3F3F3F] text-2xl'}>
              Eliminar favorito
            </CustomText>
            <CustomText
              weight={'medium'}
              style={'text-center text-[#3F3F3F] text-base mt-4'}>
              ¿Estás seguro de que quieres eliminar este favorito? Esta acción
              es irreversible.
            </CustomText>
            <View className="flex-row justify-center mt-8">
              <TouchableOpacity
                onPress={() => deleteFavourite()}
                className="mr-4 rounded-full items-center justify-center bg-[#3282FD] w-[120px] h-[50px]">
                <CustomText
                  weight={'medium'}
                  style={'text-white text-center text-lg'}>
                  Aceptar
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal()}
                className="rounded-full items-center justify-center bg-white border border-[#F3530E] w-[120px] h-[50px]">
                <CustomText
                  weight={'medium'}
                  style={'text-[#F3530E] text-center text-lg'}>
                  Rechazar
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomModal;
