const express = require("express");

const Dish = require('../models/dish');

const router = express.Router();

router.post("", (req, res, next) => {
    const dish = new Dish({
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tags,
        imagePath: req.body.imagePath
    });
    dish.save().then(createdDish => {
        res.status(201).json({
             message: "Dish added successfully",
             dishId: createdDish._id
        });
    });
});

router.put("/:id", (req, res, next) => {
    const dish = new Dish({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tags,
        imagePath: req.body.imagePath
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