const express = require("express");
//encrypt passwords
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();


router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        name: req.body.name
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: "User created!",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
  });

router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email})
        .then(user => {
            if(!user)
            {
                return res.status(401).json({
                    message: "Auth Failed"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if(!result)
            {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            const token = jwt.sign({
                email: fetchedUser.email, 
                userId: fetchedUser._id, 
                name: fetchedUser.name}, 
                "secret_string_used_for_making_token_should_be_very_long", 
                {expiresIn: "1h"}
            );
            res.status(200).json({
                token: token
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });
});

module.exports = router;