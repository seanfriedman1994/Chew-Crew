const express = require("express");
const multer = require("multer");

const Dish = require("../models/dish");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = 
{
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now() + "." + ext);
    }
});

router.post(
    "",
    checkAuth,
    multer({ storage: storage }).single("image"),
    (req, res, next) => {
      const url = req.protocol + "://" + req.get("host");
      const dish = new Dish({
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tags,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId
      });
      dish.save().then(createdDish => {
        res.status(201).json({
          message: "Dish added successfully",
          dish: {
            ...createdDish,
            id: createdDish._id
          }
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Post creation failed!"
        });
      });
    }
  );

router.put("/:id", 
checkAuth,
multer({ storage: storage }).single("image"),
(req, res, next) => {
    let imagePath = req.body.imagePath;
    if(req.file)
    {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    const dish = new Dish({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tags,
        imagePath: imagePath,
        creator: req.userData.userId
    });
    Dish.updateOne({_id: req.params.id, creator: req.userData.userId }, dish)
      .then(result => {
          if(result.nModified > 0)
          {
            res.status(200).json({message: "Update successful!"});
          }
          else
          {
            res.status(401).json({ message: "Not Authorized!"});
          }
      })
      .catch(error => {
        res.status(500).json({
          message: "Couldn't update dish!"
        });
      });
});


router.get("", (req, res, next) => {
    //only retrieve dishes on current page
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const dishQuery = Dish.find();
    let fetchedDishes;
    if(pageSize && currentPage)
    {
        dishQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    dishQuery.then(documents => {
        fetchedDishes = documents;
        return Dish.count();
    }).then(count => {
        res.status(200).json({
            message: "Dishes fetched successfully!",
            dishes: fetchedDishes,
            maxDishes: count
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching dishes failed!"
      });
    });
});

router.get("/:id", (req, res, next) => {
    Dish.findById(req.params.id).then(dish => {
        if(dish) 
        {
            res.status(200).json(dish);
        }else
        {
            res.status(404).json({message: "Dish not found!"});
        }
    }).catch(error => {
      res.status(500).json({
        message: "Fetching dish failed!"
      });
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
    Dish.deleteOne({_id: req.params.id, creator: req.userData.userId})
    .then(result => {
      if(result.n > 0)
      {
        res.status(200).json({message: "Dish Deleted!"});
      }
      else
      {
        res.status(401).json({ message: "Not Authorized!"});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting dish failed!"
      });
    });
});

module.exports = router;