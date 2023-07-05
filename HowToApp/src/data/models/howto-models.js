exports.Solucion = {
  name: 'Solucion',
  properties: {
    _id: 'objectId',
    query: 'string?',
    context: 'string',
    created_at: 'date',
  },
  primaryKey: '_id',
};

exports.Favorito = {
  name: 'Favorito',
  properties: {
    _id: 'objectId',
    solution_id: 'Solucion',
    title: 'string',
    video_id: 'string',
    description: 'string',
    tools: 'string[]',
    steps: 'string[]',
    tips: 'string[]',
    definitions: 'string[]',
    created_at: 'date',
  },
  primaryKey: '_id',
};
