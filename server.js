if (process.env.NODE_ENV !== "production") {
  require("dotenv").configDotenv();
}
const express = require("express");
const app = express();
const routes = require("./routes/routes");
app.use("/users", routes);
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("connected to db"));
app.listen(3500);
