const Crew = require("../models/crew");
const UserCrew = require("../models/user-crew");
<<<<<<< HEAD
const Profile = require("../models/profile");

=======
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac

exports.createCrew = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    if(!req.file)
    {
      image = "";
    }
    else
    {
      image = url + "/images/" + req.file.filename;
    }
    const crew = new Crew({
      name: req.body.name,
      description: req.body.description,
      image: image,
      creator: req.userData.userId
    });
    crew.save().then(createdCrew => {
      res.status(201).json({
        message: "Crew added successfully",
        crew: {
          ...createdCrew,
          id: createdCrew._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Crew creation failed!"
      });
    });
};

exports.updateCrew = (req, res, next) => {
    let image = req.body.image;
    if(req.file)
    {
        const url = req.protocol + "://" + req.get("host");
        image = url + "/images/" + req.file.filename;
    }
    const crew = new Crew({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        image: image,
        creator: req.userData.userId
    });
    Crew.updateOne({_id: req.params.id, creator: req.userData.userId }, crew)
      .then(result => {
          if(result.n > 0)
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
          message: "Couldn't update crew!"
        });
      });
};

exports.getAllCrews = (req, res, next) => {
<<<<<<< HEAD
    //only retrieve on current page
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;

    console.log(req.query.crewId);
    //get crew members
    if(req.query.crewId)
    {
      console.log("get crewMembers");
      const crewId = req.query.crewId;
      const userCrewQuery = UserCrew.find({ crew: crewId }).populate('profile');
      let fetchedCrewMembers = [];
      userCrewQuery.then(documents => {
        console.log(documents);
        for(let i = 0; i < documents.length; i++)
          {
            fetchedCrewMembers.push(documents[i].profile);
          }
          console.log(fetchedCrewMembers);
          return fetchedCrewMembers.length;
      }).then(count => {
          res.status(200).json({
              message: "Crew members fetched successfully!",
              crewMembers: fetchedCrewMembers,
              maxCrewMembers: count
          });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching crew members failed!"
        });
      });
    }
    //get crews for a particular user
    else if(req.query.profileId)
    {
        console.log("get user's crews");
        const profileId = req.query.profileId;
        console.log("profileId");
        console.log(profileId);
        let fetchedUserCrews = [];
        const userCrewQuery = UserCrew.find({profile: profileId}).populate('crew');
        if(pageSize && currentPage)
        {
            userCrewQuery
                .skip(pageSize * (currentPage - 1))
                .limit(pageSize);
        }
        userCrewQuery.then(documents => {
          console.log(documents);
          for(let i = 0; i < documents.length; i++)
          {
            fetchedUserCrews.push(documents[i].crew);
          }
          console.log(fetchedUserCrews);
          return fetchedUserCrews.length;
         }).then(count => {
            res.status(200).json({
                message: "User crews fetched successfully!",
                crews: fetchedUserCrews,
                maxCrews: count
            });
          }).catch(error => {
            res.status(500).json({
              message: "Fetching user crews failed"
            })
          });
        
    }
    else
    //get all crews
    {
      console.log("get all crews");
        const crewQuery = Crew.find();
        let fetchedCrews;
        if(pageSize && currentPage)
        {
            crewQuery
                .skip(pageSize * (currentPage - 1))
                .limit(pageSize);
        }
        crewQuery.then(documents => {
            fetchedCrews = documents;
            return Crew.count();
        }).then(count => {
            res.status(200).json({
                message: "Crews fetched successfully!",
                crews: fetchedCrews,
                maxCrews: count
            });
        })
        .catch(error => {
          res.status(500).json({
            message: "Fetching crews failed!"
          });
        });
    }
    
=======
    //only retrieve dishes on current page
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const crewQuery = Crew.find();
    let fetchedCrews;
    if(pageSize && currentPage)
    {
        crewQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    crewQuery.then(documents => {
        fetchedCrews = documents;
        return Crew.count();
    }).then(count => {
        res.status(200).json({
            message: "Crews fetched successfully!",
            crews: fetchedCrews,
            maxCrews: count
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching crews failed!"
      });
    });
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
};

exports.getOneCrew = (req, res, next) => {
    Crew.findById(req.params.id).then(crew => {
        if(crew) 
        {
            res.status(200).json(crew);
        }else
        {
            res.status(404).json({message: "Crew not found!"});
        }
    }).catch(error => {
      res.status(500).json({
        message: "Fetching crew failed!"
      });
    });
};

<<<<<<< HEAD
exports.getUserCrews = (req, res, next) => {
    const crewQuery = UserCrew.find(req.body.crewId);


    let fetchedCrews;
    crewQuery.then(documents => {
        fetchedCrews = documents;
        res.status(200).json({
            message: "Crews fetched successfully!",
            crews: fetchedCrews
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching crews failed!"
      });
    });
}

exports.joinCrew = (req, res, next) => {
    console.log(req.body.crewId);
    console.log(req.body.profileId);

    const profileId = req.body.profileId;
    const crewId = req.body.crewId;

    const userCrew = new UserCrew({
      profile: profileId,
      crew: crewId
    });

    console.log(userCrew);

    userCrew.save().then(createdUserCrew => {
      res.status(201).json({
        message: "UserCrew added successfully",
        userCrew: {
          ...createdUserCrew,
          id: createdUserCrew._id
        }
=======
exports.joinCrew = (req, res, next) => {
    console.log(req.body.crewId);
    console.log(req.userData.userId);

    const userCrew = new UserCrew({
      crewId: req.body.crewId,
      userId: req.userData.userId
    });

    UserCrew.find({crewId: userCrew.crewId, userId: userCrew.userId})
      .then(foundUser => {
        if(foundUser)
        {
          res.status(500).json({
            message: "User-Crew relationship already exists!"
          })
        }
      })

    userCrew.save().then(createdUserCrew => {
      res.status(201).json({
        message: "Crew successfully joined"
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
      });
    })
    .catch(error => {
      res.status(500).json({
<<<<<<< HEAD
        message: "User Crew creation failed!"
=======
        message: "Join crew failed!"
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
      });
    });
}

exports.deleteCrew = (req, res, next) => {
    Crew.deleteOne({_id: req.params.id, creator: req.userData.userId})
    .then(result => {
      if(result.n > 0)
      {
        res.status(200).json({message: "Crew Deleted!"});
      }
      else
      {
        res.status(401).json({ message: "Not Authorized!"});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting crew failed!"
      });
    });
<<<<<<< HEAD
};

exports.deleteUserCrew = (req, res, next) => {
  console.log("delete user crew");
  console.log(req.params.crewId);
  console.log(req.params.profileId);
  crewId = req.params.crewId;
  profileId = req.params.profileId;

    UserCrew.deleteOne({crew: crewId, profile: profileId})
    .then(result => {
      console.log(result);
      if(result.n > 0)
      {
        res.status(200).json({message: "User Crew Deleted!"});
      }
      else
      {
        res.status(401).json({ message: "Failure leaving crew!"});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Leaving crew failed!"
      });
    });
=======
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
};