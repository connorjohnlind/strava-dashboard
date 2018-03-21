require('../config/config');
const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI;
const dbName = 'stravadash-demo';

const findDocuments = (db, callback) => {
  const collection = db.collection('demoData');
  collection.find({}).toArray((err, docs) => {
    callback(docs[0].data);
  });
};

module.exports = (app) => {
  app.get('/api/demo/', (req, res) => {
    MongoClient.connect(url, (err, client) => {
      const db = client.db(dbName);
      findDocuments(db, (data) => {
        res.send({ data });
        client.close();
      });
    });
  });
};
