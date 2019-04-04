const mongoose = require('mongoose');

const userCrewSchema = mongoose.Schema({
    userId: {type: String, required: true},
    crewId: {type: String, required: true}
});

module.exports = mongoose.model('UserCrew', userCrewSchema);