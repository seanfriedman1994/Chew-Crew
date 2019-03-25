const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Dish = require('./models/dish');

const app = express();

mongoose.connect("mongodb+srv://Sean:adminadmin@cluster0-w3f3h.mongodb.net/node-angular?retryWrites=true")
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });
//password is adminadmin

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", 
    "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
}); //solves CORS issue

app.post("/api/dishes", (req, res, next) => {
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


app.get("/api/dishes", (req, res, next) => {
    Dish.find().then(documents => {
        res.status(200).json({
            message: "Dishes fetched successfully!",
            dishes: documents
        });
    });
});

app.delete("/api/dishes/:id", (req, res, next) => {
    Dish.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: "Dish deleted!"});
    });
});

module.exports = app;