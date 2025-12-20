const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, unique: true },
  airline: String,
  departurePlace: String,
  arrivalPlace: String,
  departureTime: Date,
  arrivalTime: Date,
  basePrice: Number,
  bookingAttempt: { type: Number, default: 0 }
});

module.exports = mongoose.model("Flight", flightSchema);
