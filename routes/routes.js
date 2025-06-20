const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "Thank you" });
});

router.get("/ticket", auth, (req, res) => {
  res.status(401).json({ message: "Unauthorized" });
});

function auth(req, res, next) {
  console.log("Athorized");
  next();
}
module.exports = router;
