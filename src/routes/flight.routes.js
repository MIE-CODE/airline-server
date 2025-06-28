const express = require("express");
const router = express.Router();
const {
  getFlights,
  createFlight,
  getFlight,
  updateFlight,
  deleteFlight,
} = require("../controllers/flight.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Flight:
 *       type: object
 *       required:
 *         - airline
 *         - origin
 *         - destination
 *         - departureTime
 *         - arrivalTime
 *         - price
 *       properties:
 *         airline:
 *           type: string
 *           example: Air Peace
 *         origin:
 *           type: string
 *           example: Lagos
 *         destination:
 *           type: string
 *           example: Abuja
 *         departureTime:
 *           type: string
 *           format: date-time
 *           example: 2025-07-01T10:00:00Z
 *         arrivalTime:
 *           type: string
 *           format: date-time
 *           example: 2025-07-01T12:00:00Z
 *         price:
 *           type: number
 *           example: 45000
 *         status:
 *           type: string
 *           enum: [scheduled, cancelled, completed]
 *           default: scheduled
 */

/**
 * @swagger
 * tags:
 *   name: Flights
 *   description: Flight management APIs
 */

/**
 * @swagger
 * /flights:
 *   post:
 *     summary: Create a new flight
 *     tags: [Flights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flight'
 *     responses:
 *       201:
 *         description: Flight created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/flights", createFlight);

/**
 * @swagger
 * /api/flights:
 *   get:
 *     summary: Get all flights
 *     tags: [Flights]
 *     responses:
 *       200:
 *         description: List of flights
 */
router.get("/flights", getFlights);

/**
 * @swagger
 * /api/flights/{id}:
 *   get:
 *     summary: Get flight by ID
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Flight ID
 *     responses:
 *       200:
 *         description: Flight details
 *       404:
 *         description: Flight not found
 */
router.get("/flights/:id", getFlight);

/**
 * @swagger
 * /api/flights/{id}:
 *   patch:
 *     summary: Update a flight
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Flight ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flight'
 *     responses:
 *       200:
 *         description: Flight updated
 *       404:
 *         description: Flight not found
 */
router.patch("/flights/:id", updateFlight);

/**
 * @swagger
 * /api/flights/{id}:
 *   delete:
 *     summary: Delete a flight
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Flight ID
 *     responses:
 *       200:
 *         description: Flight deleted
 *       404:
 *         description: Flight not found
 */
router.delete("/flights/:id", deleteFlight);

// Optional auth middleware
function auth(req, res, next) {
  console.log("Authorized");
  next();
}

module.exports = router;
