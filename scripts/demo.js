require('../config/config');

const { MongoClient } = require('mongodb');
const assert = require('assert');

const url = process.env.MONGODB_URI;
const dbName = 'stravadash-demo';

const dummy = require('./demo.data');

const insertDocument = (db, callback) => {
  const collection = db.collection('demoData');
  collection.drop(() => {
    console.log('Wiped collection');
  });
  collection.insert({ data: JSON.stringify(dummy) }, (err, result) => {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log('Inserted 1 document into the collection');
    callback(result);
  });
};

MongoClient.connect(url, (err, client) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  insertDocument(db, () => {
    client.close();
  });
});
