const { searchFlights } = require("../services/flight.service");

exports.searchFlights = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: "from and to are required" });
    }

    const flights = await searchFlights(from, to);

    return res.json({
      count: flights.length,
      flights
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flights" });
  }
};
