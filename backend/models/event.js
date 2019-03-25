const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: { type: String, required: true},
    date: { type: String, required: false},
    description: { type: String, required: true},
    location: { type: String, required: false}
});

module.exports = mongoose.model('Event', eventSchema);
