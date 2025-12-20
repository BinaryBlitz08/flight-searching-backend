const BookingAttempt = require("../models/BookingAttempt");

const FIVE_MIN = 5 * 60 * 1000;
const TEN_MIN = 10 * 60 * 1000;

exports.calculatePrice = async (userId, flight) => {
  const now = new Date();

  let attempt = await BookingAttempt.findOne({
    userId,
    flightId: flight._id
  });

  if (!attempt) {
    await BookingAttempt.create({
      userId,
      flightId: flight._id
    });
    return flight.basePrice;
  }

  const timeDiff = now - attempt.firstAttemptTime;

  if (timeDiff > TEN_MIN) {
    attempt.attemptCount = 1;
    attempt.firstAttemptTime = now;
    await attempt.save();
    return flight.basePrice;
  }

  if (timeDiff <= FIVE_MIN) {
    attempt.attemptCount += 1;
    await attempt.save();

    if (attempt.attemptCount >= 3) {
      return Math.round(flight.basePrice * 1.1);
    }
  }

  return flight.basePrice;
};
