const mongoose = require('mongoose');

const userCrewSchema = mongoose.Schema({
    profile: {type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true},
    crew: {type: mongoose.Schema.Types.ObjectId, ref: "Crew", required: true}
});

module.exports = mongoose.model('UserCrew', userCrewSchema);