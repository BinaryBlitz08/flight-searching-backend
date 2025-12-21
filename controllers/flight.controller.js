// Example: GET /api/flights/search?from=Delhi&to=Mumbai&date=2025-01-10
const { searchFlights } = require("../services/flight.service");

exports.searchFlights = async (req, res) => {
  try {
    const { from, to, date } = req.query;

    const flights = await searchFlights(from, to, date);

    res.json({
      count: flights.length,
      flights,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
