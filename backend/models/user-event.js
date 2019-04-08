const mongoose = require('mongoose');

const userEventSchema = mongoose.Schema({
    profile: {type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true},
    event: {type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true}
});

module.exports = mongoose.model('UserEvent', userEventSchema);