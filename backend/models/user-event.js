const mongoose = require('mongoose');

const userEventSchema = mongoose.Schema({
    userId: {type: String, required: true},
    eventId: {type: String, required: true}
});

module.exports = mongoose.model('UserEvent', userEventSchema);