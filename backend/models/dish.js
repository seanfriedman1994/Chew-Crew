const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    tags: { type: String, required: true}
});

mongoose.model('Dish', dishSchema);