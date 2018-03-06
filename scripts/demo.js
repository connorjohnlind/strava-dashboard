const { MongoClient } = require('mongodb');
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/StravaDash-demo';

// Database Name
const dbName = 'StravaDash-demo';

const insertDocuments = (db, callback) => {
  // Get the documents collection
  const collection = db.collection('demoData');
  // Insert some documents
  collection.insert({ a: 1 }, (err, result) => {
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

  insertDocuments(db, () => {
    client.close();
  });
});
