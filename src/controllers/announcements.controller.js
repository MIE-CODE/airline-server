const Announcement = require("../models/announcements.model");
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({}).sort({ createdAt: -1 });
    if (announcements) {
      return res
        .status(200)
        .json({ message: "Announcements", data: announcements });
    }
    res.status(404).json({ message: "You should fix this later" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
const createAnnouncement = async (req, res) => {
  const { message, type, priority, createdBy, expiresAt } = req.body;
  try {
    const announcement = await Announcement.create({
      message,
      type,
      priority,
      createdBy,
      expiresAt,
    });
    if (announcement) {
      return res
        .status(201)
        .json({ message: "Announcement created", data: announcement });
    }
    res.status(500).json({ message: "Failed to create announcement" });
  } catch (error) {
    res.status(400).json({ message: "An error occured", error: error.message });
  }
};
module.exports = {
  getAnnouncements,
  createAnnouncement,
};
