const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const flightRoutes = require("./routes/flight.routes");
const bookingRoutes = require("./routes/booking.routes");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/tickets", express.static(path.join(__dirname, "tickets")));

module.exports = app;
