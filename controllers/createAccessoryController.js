const createAccessoryController = require('express').Router();

const { createAccessory } = require('../services/accessoryService');

createAccessoryController.get('/', (req, res) => {
    res.render('createAccessory', { title: 'Create Accessory - Cubicle' });
});

createAccessoryController.post('/', async (req, res) => {
    try {
        const name = req.body.name.trim();
        const description = req.body.description.trim();
        const imageUrl = req.body.imageUrl.trim();

        const accessoryData = { name, description, imageUrl };

        Object.values(accessoryData).forEach((x) => {
            if (x == '') {
                throw new Error('All fields are required');
            }
        });

        await createAccessory(accessoryData);

        res.redirect('/');
    } catch (error) {
        let errorMsg;

        if (error.errors) {
            Object.values(error.errors).forEach((x) => (errorMsg = x.properties?.message));
        } else {
            errorMsg = error.message;
        }

        res.render('createAccessory', { title: 'Create Accessory - Cubicle', error: errorMsg });
    }
});

module.exports = createAccessoryController;
