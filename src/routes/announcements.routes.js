const {
  getAnnouncements,
  createAnnouncement,
} = require("../controllers/announcements.controller");

const express = require("express");

const router = express.Router();
router.get("/announcements", getAnnouncements);
router.post("/announcements", createAnnouncement);

module.exports = router;
