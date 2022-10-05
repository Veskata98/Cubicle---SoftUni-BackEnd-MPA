const createController = require('express').Router();
const Cubic = require('../models/cubicModel');

createController.get('/', (req, res) => {
    res.render('create', { title: 'Create Cube Page' });
});

createController.post('/', async (req, res) => {
    console.log(req.body);
    try {
        await Cubic.create({
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficultyLevel: req.body.difficultyLevel,
        });

        res.redirect('/');
    } catch (error) {
        res.render('404', { title: 'Form not passed' });
    }
});

module.exports = createController;
