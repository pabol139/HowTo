import {createRealmContext} from '@realm/react';
import {Favorito, Solucion} from '../models/howto-models';

const schema = [Solucion, Favorito]; // importar todos los modelos de 'models'

const config = {schema: schema, schemaVersion: 6};

const realmContext = createRealmContext(config);

export default realmContext;
