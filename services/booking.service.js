const Flight = require("../models/Flight");
const Booking = require("../models/Booking");
const { calculatePrice } = require("./pricing.service");
const generatePNR = require("../utils/generatePNR");

exports.previewBooking = async (userId, flightId) => {
  const flight = await Flight.findById(flightId);
  if (!flight) throw new Error("Flight not found");

  const finalPrice = await calculatePrice(userId, flight);

  return {
    flightNumber: flight.flightNumber,
    airline: flight.airline,
    route: `${flight.departurePlace} → ${flight.arrivalPlace}`,
    basePrice: flight.basePrice,
    finalPrice
  };
};
