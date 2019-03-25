const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    tags: { type: String, required: false},
    imagePath: { type: String, required: false}
});

module.exports = mongoose.model('Dish', dishSchema);