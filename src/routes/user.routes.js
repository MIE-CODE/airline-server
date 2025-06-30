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
// /**
//  * @swagger
//  * /api/payments:
//  *   post:
//  *     summary: Process a payment for a booking
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - bookingId
//  *               - amount
//  *               - paymentMethod
//  *             properties:
//  *               bookingId:
//  *                 type: string
//  *               amount:
//  *                 type: number
//  *               paymentMethod:
//  *                 type: string
//  *                 enum: [card, wallet, bank_transfer]
//  *     responses:
//  *       200:
//  *         description: Payment successful
//  *       400:
//  *         description: Payment failed
//  */

module.exports = router;
