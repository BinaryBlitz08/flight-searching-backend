const router = require("express").Router();
const { bookFlight } = require("../controllers/booking.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/book", authMiddleware, bookFlight);

module.exports = router;
