const express = require("express");
const {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  getUserBooking,
  loginUser,
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/auth/register", createUser);
router.post("/auth/login", loginUser);
router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id", updateUser);
router.get("/users/:id/bookings", getUserBooking);
module.exports = router;
