const mongoose = require('mongoose');

const userDishSchema = mongoose.Schema({
    profile: {type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true},
    dish: {type: mongoose.Schema.Types.ObjectId, ref: "Dish", required: true}
});

module.exports = mongoose.model('UserDish', userDishSchema);