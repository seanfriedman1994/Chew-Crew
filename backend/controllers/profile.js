const Profile = require("../models/profile");

exports.fetchProfile = (req, res, next) => {
    console.log(req.params.email);
    Profile.findOne({ email: req.params.email })
        .then(profile => {
            if(!profile)
            {
                console.log("!profile");
                return;
            }
            //fetchedProfile = profile;
            console.log(profile);
            res.status(200).json(profile);
        })
        .catch(err => {
            res.status(500).json({
                  message: "fetch Profile error!"
            });
        });
};

exports.createProfile = (req, res, next) => {
    const profile = new Profile({
        email: req.body.email,
        name: req.body.name,
        bio: req.body.bio,
        image: req.body.image
    });
    console.log(profile);
    console.log("hegtt");
    profile.save()
    .then(createdProfile => {
        res.status(201).json({
            message: "Profile saved successfully!",
            createProfile: createdProfile
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "error saving profile!"
        });
    });
};