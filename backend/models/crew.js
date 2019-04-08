const mongoose = require('mongoose');

const crewSchema = mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    image: { type: String, required: false},
<<<<<<< HEAD
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    }]
=======
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
});

module.exports = mongoose.model('Crew', crewSchema);