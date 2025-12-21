import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";
import User from "../models/User.js";
import BookingAttempt from "../models/BookingAttempt.js";
import generatePNR from "../utils/pnrGenerator.js";
import generateTicket from "../utils/pdfGenerator.js"; // import PDF generator

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

    const pdfPath = await generateTicket(booking, flight, user);
    booking.ticketPdfUrl = pdfPath;
    await booking.save();

    res.status(201).json({
      message: "Booking successful",
      booking
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getBookingHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch bookings for this user
    const bookings = await Booking.find({ userId })
      .populate("flightId", "flightNumber airline departurePlace arrivalPlace departureTime arrivalTime basePrice") // get flight details
      .sort({ bookingDate: -1 }); // newest first

    res.json({
      message: "Booking history fetched successfully",
      bookings
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
