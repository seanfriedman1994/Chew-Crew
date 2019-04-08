const mongoose = require('mongoose');

const userEventSchema = mongoose.Schema({
<<<<<<< HEAD
    profile: {type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true},
    event: {type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true}
=======
    userId: {type: String, required: true},
    eventId: {type: String, required: true}
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
});

module.exports = mongoose.model('UserEvent', userEventSchema);