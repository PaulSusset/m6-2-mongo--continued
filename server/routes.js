const router = require('express').Router();
const { getSeats, bookSeat } = require('./handlers');

// Code that is generating the seats.
// ----------------------------------
// const seats = {};
// const row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
// for (let r = 0; r < row.length; r++) {
//   for (let s = 1; s < 13; s++) {
//     seats[`${row[r]}-${s}`] = {
//       _id: `${row[r]}-${s}`,
//       price: 225,
//       isBooked: false,
//     };
//   }
// }
// console.log(seats);
// ----------------------------------

router.get('/api/seat-availability', getSeats);

router.post('/api/book-seat', bookSeat);

module.exports = router;
