const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: false},
    bio: {type: String, required: false},
    image: {type: String, required: false},
    crews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crew"
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }]
});

module.exports = mongoose.model('Profile', profileSchema);