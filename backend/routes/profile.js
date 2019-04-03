const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/profile");
const extractFile = require("../middleware/file");


router.post("", extractFile, ProfileController.createProfile);
router.get("/:email", ProfileController.fetchProfile);
router.put("/:id", extractFile, ProfileController.updateProfile);

module.exports = router;