const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

mongoose.connect("mongodb+srv://Sean:" + process.env.MONGO_ATLAS_PW + "@cluster0-w3f3h.mongodb.net/node-angular?retryWrites=true")
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });
//password is adminadmin

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", 
    "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
}); //solves CORS issue

const dishesRoutes = require("./routes/dishes");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const crewsRoutes = require("./routes/crews");
const eventsRoutes = require("./routes/events");

app.use("/api/dishes", dishesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/crews", crewsRoutes);
app.use("/api/events", eventsRoutes);



module.exports = app;