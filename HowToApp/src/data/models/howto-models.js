exports.Historial = {
  name: 'Historial',
  properties: {
    soluciones: 'Solucion[]',
  },
};

exports.Favoritos = {
  name: 'Favoritos',
  properties: {
    favourites: 'Favorito[]',
  },
};

exports.Solucion = {
  name: 'Solucion',
  properties: {
    _id: 'objectId',
    query: 'string?',
    created_at: 'date',
  },
  primaryKey: '_id',
};

exports.Favorito = {
  name: 'Favorito',
  properties: {
    _id: 'objectId',
    solution_id: 'Solucion',
    video_id: 'string',
    description: 'string',
    steps: 'string[]',
    tips: 'string[]',
    definitions: 'Definicion[]',
    created_at: 'date',
  },
  primaryKey: '_id',
};

exports.Definicion = {
  name: 'Definicion',
  properties: {
    _id: 'objectId',
    word: 'string',
    description: 'string',
  },
  primaryKey: '_id',
};
