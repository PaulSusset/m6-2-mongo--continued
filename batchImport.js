const fs = require('file-system');
const { MongoClient } = require('mongodb');
const assert = require('assert');

const seats = [];
const row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
for (let r = 0; r < row.length; r++) {
  for (let s = 1; s < 13; s++) {
    seats.push({
      _id: `${row[r]}-${s}`,
      price: 225,
      isBooked: false,
    });
  }
}
console.log(seats);
const batchImport = async () => {
  try {
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    });
    await client.connect();
    const db = client.db('mongoContinued');
    const r = await db.collection('seats').insertMany(seats);
    assert.equal(seats.length, r.insertedCount);
    console.log(201);
  } catch (err) {
    console.log(err);
  }
  client.close();
};
batchImport();
