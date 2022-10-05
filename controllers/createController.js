const createController = require('express').Router();
const Cube = require('../models/Cube');

createController.get('/', (req, res) => {
    res.render('create', { title: 'Create Cube Page' });
});

createController.post('/', async (req, res) => {
    console.log(req.body);
    try {
        await Cube.create({
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
