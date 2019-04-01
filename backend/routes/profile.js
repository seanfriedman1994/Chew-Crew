const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/profile");

router.get("/:email", ProfileController.fetchProfile);
router.post("", ProfileController.createProfile);

module.exports = router;