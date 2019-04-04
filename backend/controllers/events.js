const Event = require("../models/event");

exports.createEvent = (req, res, next) => {
    const event = new Event({
      name: req.body.name,
      date: req.body.date,
      location: req.body.location,
      description: req.body.description,
      creator: req.userData.userId,
      crewId: req.body.crewId
    });
    console.log(event);
    event.save().then(createdEvent => {
      res.status(201).json({
        message: "Event added successfully",
        event: {
          ...createdEvent,
          id: createdEvent._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Event creation failed!"
      });
    });
};

exports.updateEvent = (req, res, next) => {
    const event = new Event({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        creator: req.userData.userId,
        crewId: req.body.crewId
    });
    Event.updateOne({_id: req.params.id, creator: req.userData.userId }, event)
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
          message: "Couldn't update event!"
        });
      });
};

exports.getEvents = (req, res, next) => {
    //only retrieve events on current page
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const crewId = req.query.crewId;
    const eventQuery = Event.find({ crewId: crewId });
    let fetchedEvents;
    if(pageSize && currentPage)
    {
        eventQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    eventQuery.then(documents => {
        fetchedEvents = documents;
        return Event.count();
    }).then(count => {
        res.status(200).json({
            message: "Events fetched successfully!",
            events: fetchedEvents,
            maxEvents: count
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching events failed!"
      });
    });
};

exports.getOneEvent = (req, res, next) => {
    Event.findById(req.params.id).then(event => {
        if(event) 
        {
            res.status(200).json(event);
        }else
        {
            res.status(404).json({message: "Event not found!"});
        }
    }).catch(error => {
      res.status(500).json({
        message: "Fetching event failed!"
      });
    });
};

exports.deleteEvent = (req, res, next) => {
  console.log(req.params.id);
    Event.deleteOne({_id: req.params.id, creator: req.userData.userId})
    .then(result => {
      if(result.n > 0)
      {
        res.status(200).json({message: "Event Deleted!"});
      }
      else
      {
        res.status(401).json({ message: "Not Authorized!"});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting event failed!"
      });
    });
};