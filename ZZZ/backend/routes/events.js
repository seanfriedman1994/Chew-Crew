const express = require("express");
const router = express.Router();
const EventController = require("../controllers/events");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");


router.post(
    "",
    checkAuth,
    extractFile,
    EventController.createEvent
);

router.put("/:id", 
  checkAuth,
  extractFile,
  EventController.updateEvent
);

router.post("/:profileId", checkAuth, extractFile, EventController.joinEvent);

router.get("", EventController.getEvents);

router.get("/:id", EventController.getOneEvent);

router.delete("/:id", checkAuth, EventController.deleteEvent);

router.delete("/:eventId/:profileId", checkAuth, EventController.deleteUserEvent);

module.exports = router;