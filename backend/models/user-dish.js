const mongoose = require('mongoose');

const userDishSchema = mongoose.Schema({
    userId: {type: String, required: true},
    dishId: {type: String, required: true}
});

module.exports = mongoose.model('UserDish', userDishSchema);