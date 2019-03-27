const express = require("express");
const multer = require("multer");

const Dish = require("../models/dish");

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
    multer({ storage: storage }).single("image"),
    (req, res, next) => {
      const url = req.protocol + "://" + req.get("host");
      const dish = new Dish({
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tags,
        imagePath: url + "/images/" + req.file.filename
      });
      dish.save().then(createdDish => {
        res.status(201).json({
          message: "Dish added successfully",
          dish: {
            ...createdDish,
            id: createdDish._id
          }
        });
      });
    }
  );

router.put("/:id", 
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
        imagePath: imagePath
    });
    Dish.updateOne({_id: req.params.id}, dish).then(result => {
        console.log(result);
        res.status(200).json({message: "Update successful!"});
    });
});


router.get("", (req, res, next) => {
    Dish.find().then(documents => {
        res.status(200).json({
            message: "Dishes fetched successfully!",
            dishes: documents
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
            res.status(404).json({message: 'Dish not found!'});
        }
    });
});

router.delete("/:id", (req, res, next) => {
    Dish.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: "Dish deleted!"});
    });
});

module.exports = router;