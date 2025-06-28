const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MIE AIR",
      version: "1.0.0",
      description:
        "The Flight Management Software is a comprehensive system designed to handle flight bookings, passenger documentation, and operational logistics. It streamlines the entire air travel experience for both airlines and travelers by enabling efficient scheduling, booking management, and document verification.\n\n**Key Features:**\n- **Flight Booking System**: Allows users to search, book, and manage flight reservations.\n- **Passenger Management**: Collects and stores essential passenger information, including ID/passport details.\n- **Digital Documentation**: Upload and verify travel documents such as tickets, visas, and boarding passes.\n- **Flight Scheduling**: Manages flight routes, departure/arrival times, and seat availability.\n- **Notifications**: Sends real-time updates for flight status, changes, and reminders.\n- **Admin Dashboard**: Provides tools for managing flights, users, and system analytics.\n\nIdeal for airline companies, travel agencies, and airport systems, this software ensures smoother operations and a better customer experience by digitizing and centralizing all flight-related processes.",
    },
    // components: {
    //   schemas: {
    //     User: {
    //       type: "object",
    //       required: ["name", "email", "password"],
    //       properties: {
    //         name: {
    //           type: "string",
    //           example: "John Doe",
    //         },
    //         email: {
    //           type: "string",
    //           format: "email",
    //           example: "johndoe@example.com",
    //         },
    //         password: {
    //           type: "string",
    //           format: "password",
    //           example: "StrongPassword123",
    //         },
    //         role: {
    //           type: "string",
    //           enum: ["user", "admin"],
    //           default: "user",
    //           example: "user",
    //         },
    //       },
    //     },
    //   },
    // },
    // paths: {
    //   "/users": {
    //     post: {
    //       summary: "Register a new user",
    //       tags: ["Users"],
    //       requestBody: {
    //         required: true,
    //         content: {
    //           "application/json": {
    //             schema: {
    //               $ref: "#/components/schemas/User",
    //             },
    //           },
    //         },
    //       },
    //       responses: {
    //         201: {
    //           description: "User created successfully",
    //         },
    //         400: {
    //           description: "Invalid input",
    //         },
    //       },
    //     },
    //   },
    //   "/flights": {
    //     post: {},
    //   },
    //   "flights/:id": {
    //     delete: {},
    //   },
    //   "/bookings": {},
    // },
  },
  tags: [
    {
      name: "Users",
      description: "User management (register, update, delete)",
    },
    { name: "Bookings", description: "Flight booking management" },
    { name: "Payments", description: "Payment processing" },
    { name: "Auth", description: "Authentication and authorization" },
  ],
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
