const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: { type: String, required: true},
    date: { type: String, required: true},
    location: { type: String, required: true},
    description: { type: String, required: false},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    crewId: {type: String, required: true}
});

module.exports = mongoose.model('Event', eventSchema);
