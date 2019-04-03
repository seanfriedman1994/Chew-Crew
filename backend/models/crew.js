const mongoose = require('mongoose');

const crewSchema = mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    image: { type: String, required: false},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

module.exports = mongoose.model('Crew', crewSchema);