const express = require('express');

const app = express();

app.use('/api/dishes', (req, res, next) => {
    const dishes = 
    [
        
    ];

    res.status(200).json({
        message: 'Dishes fetched successfully',
        dishes: dishes
    });
});

module.exports = app;