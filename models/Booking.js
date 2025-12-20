const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: "Flight" },
  amountPaid: Number,
  pnr: String,
  ticketPdfUrl: String,
  bookingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
