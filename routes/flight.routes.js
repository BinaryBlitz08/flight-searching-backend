const router = require("express").Router();
const { searchFlights } = require("../controllers/flight.controller");

router.get("/search", searchFlights);

module.exports = router;
