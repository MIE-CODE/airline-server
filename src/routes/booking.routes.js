const express = require("express");
const router = express.Router();

const {
  bookFlight,
  getBookingById,
  getAllBookings,
  updateBooking,
  deleteBooking,
} = require("../controllers/booking.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - user
 *         - flight
 *         - seatNumber
 *         - bookingDate
 *       properties:
 *         user:
 *           type: string
 *           description: ID of the user who booked the flight
 *         flight:
 *           type: string
 *           description: ID of the flight
 *         seatNumber:
 *           type: string
 *           example: "12A"
 *         bookingDate:
 *           type: string
 *           format: date
 *           example: "2025-07-01"
 *         status:
 *           type: string
 *           enum: [confirmed, cancelled]
 *           default: confirmed
 */

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Flight booking management
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Book a flight
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Flight booked successfully
 *       400:
 *         description: Invalid input
 */
router.post("/bookings", bookFlight);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of all bookings
 */
router.get("/bookings", getAllBookings);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get booking details by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details
 *       404:
 *         description: Booking not found
 */
router.get("/bookings/:id", getBookingById);

/**
 * @swagger
 * /api/bookings/{id}:
 *   patch:
 *     summary: Update a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seatNumber:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [confirmed, cancelled]
 *     responses:
 *       200:
 *         description: Booking updated
 *       404:
 *         description: Booking not found
 */
router.patch("/bookings/:id", updateBooking);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Delete a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking deleted
 *       404:
 *         description: Booking not found
 */
router.delete("/bookings/:id", deleteBooking);
module.exports = router;
