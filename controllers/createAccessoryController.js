const createAccessoryController = require('express').Router();
const Accessory = require('../models/Accessory');

createAccessoryController.get('/', (req, res) => {
    res.render('createAccessory', { title: 'Create Accessory' });
});

createAccessoryController.post('/', async (req, res) => {
    console.log(req.body);
    try {
        await Accessory.create({
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
        });

        res.redirect('/');
    } catch (error) {
        res.render('404', { title: 'Form not passed' });
    }
});

module.exports = createAccessoryController;
