const router = require("express").Router();
const { bookFlight } = require("../controllers/booking.controller");
const authMiddleware = require("../middleware/auth.middleware");
const {getBookingHistory} = require("../controllers/booking.controller");
router.post("/book", authMiddleware, bookFlight);
router.get("/history", authMiddleware, getBookingHistory);

module.exports = router;
