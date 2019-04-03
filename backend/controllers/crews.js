const Crew = require("../models/crew");

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
};