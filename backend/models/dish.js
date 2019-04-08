const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    tags: { type: String, required: true},
    imagePath: { type: String, required: false},
<<<<<<< HEAD
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
=======
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
});

module.exports = mongoose.model('Dish', dishSchema);