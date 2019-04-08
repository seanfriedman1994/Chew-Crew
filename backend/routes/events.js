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

<<<<<<< HEAD
router.post("/:profileId", checkAuth, extractFile, EventController.joinEvent);

=======
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
router.get("", EventController.getEvents);

router.get("/:id", EventController.getOneEvent);

router.delete("/:id", checkAuth, EventController.deleteEvent);

<<<<<<< HEAD
router.delete("/:eventId/:profileId", checkAuth, EventController.deleteUserEvent);

=======
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
module.exports = router;