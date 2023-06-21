import {Platform} from 'react-native';
import * as RNFS from 'react-native-fs';
import {
  Definicion,
  Favorito,
  Favoritos,
  Historial,
  Solucion,
} from '../models/howto-models';

const schema = [Solucion, Historial, Favorito, Favoritos, Definicion]; // importar todos los modelos de 'models'

export default {
  schema: schema,
  schemaVersion: 1,
};
