const { searchFlights: searchFlightsService } =
  require("../services/flight.service");

exports.searchFlights = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: "from and to are required" });
    }

    const flights = await searchFlightsService(from, to);

    return res.status(200).json({
      count: flights.length,
      flights
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
};
