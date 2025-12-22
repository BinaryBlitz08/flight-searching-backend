// controllers/booking.controller.js

import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";
import User from "../models/User.js";
import BookingAttempt from "../models/BookingAttempt.js";
import generatePNR from "../utils/pnrGenerator.js";
import generateTicket from "../utils/pdfGenerator.js";
import { calculatePrice } from "../services/pricing.service.js"; 

export const bookFlight = async (req, res) => {
  try {
    const userId = req.user.id;
    const { flightId } = req.body;

    // 1. Find the flight
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    // 2. Calculate dynamic price using the service
    const finalPrice = await calculatePrice(userId, flight);

    // 3. Check wallet balance
    const user = await User.findById(userId);
    if (user.wallet < finalPrice) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    // 4. Deduct money from wallet
    user.wallet -= finalPrice;
    await user.save();

    // 5. Create booking
    const pnr = generatePNR();
    const booking = await Booking.create({
      userId,
      flightId,
      amountPaid: finalPrice,
      pnr,
      bookingDate: new Date(), // optional, if you have this field
    });

    // 6. Generate PDF ticket
    const pdfPath = await generateTicket(booking, flight, user);
    booking.ticketPdfUrl = pdfPath;
    await booking.save();

    // 7. Success response
    res.status(201).json({
      message: "Booking successful!",
      booking: {
        ...booking.toObject(),
        finalPrice, // optional: show the price paid
        isSurgeApplied: finalPrice > flight.basePrice, // bonus: tell frontend if surge was applied
      },
    });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};

export const getBookingHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ userId })
      .populate("flightId", "flightNumber airline departurePlace arrivalPlace departureTime arrivalTime basePrice")
      .sort({ bookingDate: -1 });

    res.json({
      message: "Booking history fetched successfully",
      bookings,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};