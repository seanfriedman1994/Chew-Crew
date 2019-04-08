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

<<<<<<< HEAD
router.delete("/:crewId/:profileId", checkAuth, CrewController.deleteUserCrew);


=======
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
module.exports = router;