import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";
import User from "../models/User.js";
import BookingAttempt from "../models/BookingAttempt.js";
import generatePNR from "../utils/pnrGenerator.js";

export const bookFlight = async (req, res) => {
  try {
    const userId = req.user.id;
    const { flightId } = req.body;

    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ message: "Flight not found" });

    let finalPrice = flight.basePrice;

    const attempt = await BookingAttempt.findOne({ userId, flightId });
    if (attempt && attempt.attemptCount >= 3) {
      finalPrice = Math.round(flight.basePrice * 1.1);
    }

    const user = await User.findById(userId);
    if (user.wallet < finalPrice) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    user.wallet -= finalPrice;
    await user.save();

    const pnr = generatePNR();

    const booking = await Booking.create({
      userId,
      flightId,
      amountPaid: finalPrice,
      pnr
    });

    res.status(201).json({
      message: "Booking successful",
      booking
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
