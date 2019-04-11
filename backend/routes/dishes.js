const express = require("express");
const DishController = require("../controllers/dishes");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const extractFile = require("../middleware/file");

router.post(
    "",
    checkAuth,
    extractFile, 
    DishController.createDish
  );

router.put("/:id", 
  checkAuth,
  extractFile,
  DishController.updateDish
);


router.post("/:profileId", extractFile, DishController.favoriteDish);

router.get("", DishController.getAllDishes);

router.get("/:id", DishController.getOneDish);

router.delete("/:id", checkAuth, DishController.deleteDish);

module.exports = router;