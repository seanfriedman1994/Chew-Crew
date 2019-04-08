const mongoose = require('mongoose');

const userCrewSchema = mongoose.Schema({
<<<<<<< HEAD
    profile: {type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true},
    crew: {type: mongoose.Schema.Types.ObjectId, ref: "Crew", required: true}
=======
    userId: {type: String, required: true},
    crewId: {type: String, required: true}
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
});

module.exports = mongoose.model('UserCrew', userCrewSchema);