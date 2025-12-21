const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, unique: true },
  airline: String,
  departureDate:Date,
  departurePlace: String,
  arrivalPlace: String,
  departureTime: Date,
  arrivalTime: Date,
  basePrice: Number,
});

module.exports = mongoose.model("Flight", flightSchema);
