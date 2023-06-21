const addSolution = () => {
  realm.write(() => {
    realm.create('Solucion', {
      _id: new Realm.BSON.ObjectId(),
      query: 'test query',
      created_at: new Date(),
    });
  });
};

export {addSolution};
