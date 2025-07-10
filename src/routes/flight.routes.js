const express = require("express");
const router = express.Router();
const {
  getFlights,
  createFlight,
  getFlight,
  updateFlight,
  deleteFlight,
} = require("../controllers/flight.controller");
const authGuard = require("../middleware/auth-guard");
router.use(authGuard);
router.post("/flights", createFlight);

router.get("/flights", getFlights);

router.get("/flights/:id", getFlight);

router.patch("/flights/:id", updateFlight);

router.delete("/flights/:id", deleteFlight);

// Optional auth middleware
function auth(req, res, next) {
  console.log("Authorized");
  next();
}

module.exports = router;
