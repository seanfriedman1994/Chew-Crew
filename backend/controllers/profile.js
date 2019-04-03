const Profile = require("../models/profile");

exports.fetchProfile = (req, res, next) => {
    let fetchedProfile;
    console.log(req.params.email);
    Profile.findOne({email: req.params.email})
        .then(profile => {
            if(!profile)
            {
                console.log("!profile");
                return;
            }
            fetchedProfile = profile;
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
    const url = req.protocol + "://" + req.get("host");
    if(!req.file)
    {
      image = "";
    }
    else
    {
      image = url + "/images/" + req.file.filename;
    }
    const profile = new Profile({
        email: req.body.email,
        name: req.body.name,
        bio: req.body.bio,
        image: image
    });
    console.log(profile);
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

exports.updateProfile = (req, res, next) => {
    let image = req.body.image;
    if(req.file)
    {
        const url = req.protocol + "://" + req.get("host");
        image = url + "/images/" + req.file.filename;
    }
    //console.log(image);
    console.log(req.params.id);
    const profile = new Profile({
        _id: req.body.id,
        email: req.body.email,
        name: req.body.name,
        bio: req.body.bio,
        image: image,
    });
    console.log(profile);
    Profile.updateOne({_id: req.params.id}, profile)
      .then(result => {
          if(result.n > 0)
          {
              res.status(200).json({message: "Update successful!"});
          }
          else
          {
            res.status(401).json({ message: "Not Updated!"});
          }
          console.log(result);
      })
      .catch(error => {
        res.status(500).json({
          message: "Couldn't update profile!"
        });
      });
};