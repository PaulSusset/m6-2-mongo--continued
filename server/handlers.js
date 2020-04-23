'use strict';
const { MongoClient } = require('mongodb');
const assert = require('assert');

const getSeats = async (req, res) => {
  console.log('here');
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    console.log('here again');
    await client.connect();
    const db = client.db('mongoContinued');
    const r = await db.collection('seats').find({}).toArray();
    let seatObj = {};
    await r.forEach((seat) => {
      console.log(seat);
      seatObj[seat._id] = seat;
    });
    console.log(seatObj);
    res
      .status(200)
      .json({ status: 200, seats: seatObj, numOfRows: 8, seatsPerRow: 12 });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: 404, error: err });
  }
  client.close();
};

const bookSeat = async (req, res) => {
  const { seatId, creditCard, expiration, fullName, email } = req.body;
  if (!creditCard || !expiration) {
    return res.status(400).json({
      status: 400,
      message: 'Please provide credit card information!',
    });
  }

  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const db = client.db('mongoContinued');
    const r = await db
      .collection('seats')
      .updateOne(
        { _id: seatId },
        { $set: { isBooked: true, bookedBy: fullName, email: email } }
      );
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);
    res.status(200).json({ status: 200, r });
  } catch (err) {
    res.status(404).json({ status: 500, error: err });
  }
  client.close();
};

module.exports = { getSeats, bookSeat };
