require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const flightRoutes = require("./routes/flight.routes");
const bookingRoutes = require("./routes/booking.routes");
const announcementsRoutes = require("./routes/announcements.routes");
const userRoutes = require("./routes/user.routes");
app.use(cors("*"));
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/api", userRoutes);
app.use("/api", flightRoutes);
app.use("/api", bookingRoutes);
app.use("/api", announcementsRoutes);

app.set("io", io);
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => {
  server.listen(process.env.PORT || 8585, () => {
    console.log(" server started and connected to db");
    io.on("connection", (socket) => {
      socket.on("announcement", (number, string, obj) => {
        console.log(number, string, obj);
      });
      // console.log("🟢 New socket:", socket.id);
    });
  });
});
