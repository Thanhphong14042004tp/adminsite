const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: String,
  from: String,
  to: String,
  departureTime: Date
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
