const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    tags: { type: String, required: true},
    imagePath: { type: String, required: false},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

module.exports = mongoose.model('Dish', dishSchema);