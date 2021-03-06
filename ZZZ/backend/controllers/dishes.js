const Dish = require("../models/dish");
const UserDish = require("../models/user-dish");


exports.createDish = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    if(!req.file)
    {
      image = "";
    }
    else
    {
      image = url + "/images/" + req.file.filename;
    }
    const dish = new Dish({
      name: req.body.name,
      description: req.body.description,
      tags: req.body.tags,
      imagePath: image,
      creator: req.userData.userId,
      eventId: req.body.eventId
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
        message: "Dish creation failed!"
      });
    });
};

exports.updateDish = (req, res, next) => {
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
        creator: req.userData.userId,
        eventId: req.body.eventId
    });
    Dish.updateOne({_id: req.params.id, creator: req.userData.userId }, dish)
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
          message: "Couldn't update dish!"
        });
      });
};

exports.getAllDishes = (req, res, next) => {
    //only retrieve dishes on current page
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;

    if(req.query.eventId)
    {
      //get an events dishes
      console.log("get event's dishes");
      const eventId = req.query.eventId;
      console.log(eventId);


      const dishQuery = Dish.find({ eventId: eventId });
      let fetchedDishes;
      if(pageSize && currentPage)
      {
          dishQuery
              .skip(pageSize * (currentPage - 1))
              .limit(pageSize);
      }
      dishQuery.then(documents => {
          fetchedDishes = documents;
          console.log(fetchedDishes);
          return fetchedDishes.length;
      }).then(count => {
          res.status(200).json({
              message: "Dishes for event fetched successfully!",
              dishes: fetchedDishes,
              maxDishes: count
          });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching dishes for event failed!"
        });
      });
    }
    //get favorite dishes for a particular user
    else if(req.query.profileId)
    {
        console.log("get user's favorite dishes");
        const profileId = req.query.profileId;
        console.log("profileId");
        console.log(profileId);
        let fetchedUserDishes = [];
        const userDishQuery = UserDish.find({profile: profileId}).populate('dish');
        if(pageSize && currentPage)
        {
            userDishQuery
                .skip(pageSize * (currentPage - 1))
                .limit(pageSize);
        }
        userDishQuery.then(documents => {
          console.log(documents);
          for(let i = 0; i < documents.length; i++)
          {
            fetchedUserDishes.push(documents[i].dish);
          }
          console.log(fetchedUserDishes);
          return fetchedUserDishes.length;
         }).then(count => {
            res.status(200).json({
                message: "User dishes fetched successfully!",
                dishes: fetchedUserDishes,
                maxDishes: count
            });
          }).catch(error => {
            res.status(500).json({
              message: "Fetching user dishes failed"
            })
          });
    }
    else
    {
      //get all dishes
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
    }

    
};

exports.favoriteDish = (req, res, next) => {

  const profileId = req.body.profileId;
  const dishId = req.body.dishId;

  console.log("profileId " + profileId);
  console.log("dishId " + dishId);

  const userDish = new UserDish({
    profile: profileId,
    dish: dishId
  });

  console.log(userDish);

  userDish.save().then(createdUserDish => {
    res.status(201).json({
      message: "UserDish added successfully",
      userDish: {
        ...createdUserDish,
        id: createdUserDish._id
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "User Dish creation failed!"
    });
  });
}

exports.getOneDish = (req, res, next) => {
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
};

exports.deleteDish = (req, res, next) => {
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
};