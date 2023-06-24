import {Platform} from 'react-native';
import * as RNFS from 'react-native-fs';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import {
  Definicion,
  Favorito,
  Favoritos,
  Historial,
  Solucion,
} from '../models/howto-models';

const schema = [Solucion, Historial, Favorito, Favoritos, Definicion]; // importar todos los modelos de 'models'

const config = {schema: schema, schemaVersion: 1};

const realmContext = createRealmContext(config);

export default realmContext;
