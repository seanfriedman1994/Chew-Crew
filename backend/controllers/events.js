const Event = require("../models/event");
<<<<<<< HEAD
const UserEvent = require("../models/user-event");
=======
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac

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
<<<<<<< HEAD

    if(req.query.eventId)
    {
      //get event members
      const eventId = req.query.eventId;
      const eventQuery = UserEvent.find({ event: eventId}).populate('profile');
      let fetchedEventMembers = [];
      eventQuery.then(documents => {
        console.log(documents);
        for(let i = 0; i < documents.length; i++)
          {
            fetchedEventMembers.push(documents[i].profile);
          }
          console.log(fetchedEventMembers);
          return fetchedEventMembers.length;
      }).then(count => {
          res.status(200).json({
              message: "Event members fetched successfully!",
              eventMembers: fetchedEventMembers,
              maxEventMembers: count
          });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching event members failed!"
        });
      });

    }
    else if(req.query.crewId)
    {
      //get events for a crew
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
          return fetchedEvents.length;
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
    }
    else if(req.query.profileId)
    {
      //get events for a user
      console.log("get user's events");
        const profileId = req.query.profileId;
        console.log("profileId");
        console.log(profileId);
        let fetchedUserEvents = [];
        const userEventQuery = UserEvent.find({profile: profileId}).populate('event');
        if(pageSize && currentPage)
        {
            userEventQuery
                .skip(pageSize * (currentPage - 1))
                .limit(pageSize);
        }
        userEventQuery.then(documents => {
          console.log(documents);
          for(let i = 0; i < documents.length; i++)
          {
            fetchedUserEvents.push(documents[i].event);
          }
          console.log("here");
          console.log(fetchedUserEvents);
          return fetchedUserEvents.length;
         }).then(count => {
            res.status(200).json({
                message: "User events fetched successfully!",
                events: fetchedUserEvents,
                maxEvents: count
            });
          }).catch(error => {
            res.status(500).json({
              message: "Fetching user events failed"
            })
          });
    }
    else
    {
      //get all events
      const eventQuery = Event.find();
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
    }
    
=======
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
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
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

<<<<<<< HEAD
exports.joinEvent = (req, res, next) => {
  console.log(req.body.eventId);
  console.log(req.body.profileId);

  const profileId = req.body.profileId;
  const eventId = req.body.eventId;

  const userEvent= new UserEvent({
    profile: profileId,
    event: eventId
  });

  console.log(userEvent);

  userEvent.save().then(createdUserEvent => {
    res.status(201).json({
      message: "UserEvent added successfully",
      userEvent: {
        ...createdUserEvent,
        id: createdUserEvent._id
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "User Event creation failed!"
    });
  });
}

=======
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
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
<<<<<<< HEAD
};

exports.deleteUserEvent = (req, res, next) => {
  console.log("delete user event");
  console.log(req.params.eventId);
  console.log(req.params.profileId);
  eventId = req.params.eventId;
  profileId = req.params.profileId;

    UserEvent.deleteOne({event: eventId, profile: profileId})
    .then(result => {
      console.log(result);
      if(result.n > 0)
      {
        res.status(200).json({message: "User Event Deleted!"});
      }
      else
      {
        res.status(401).json({ message: "Failure leaving event!"});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Leaving event failed!"
      });
    });
=======
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
};