const express = require("express");
const CrewController = require("../controllers/crews");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const extractFile = require("../middleware/file");

router.post(
    "",
    checkAuth,
    extractFile, 
    CrewController.createCrew
  );

router.put("/:id", 
  checkAuth,
  extractFile,
  CrewController.updateCrew
);

router.post("/:crewId", checkAuth, extractFile, CrewController.joinCrew);

router.get("", CrewController.getAllCrews);

router.get("/:id", CrewController.getOneCrew);

router.delete("/:id", checkAuth, CrewController.deleteCrew);

module.exports = router;