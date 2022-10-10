const { createCube } = require('../services/cubeService');

const createController = require('express').Router();

createController.get('/', (req, res) => {
    res.render('create', { title: 'Create Cube - Cubicle' });
});

createController.post('/', async (req, res) => {
    try {
        const userId = req.user.userId;

        Object.values(req.body).forEach((x) => {
            if (x == '') {
                throw new Error('All fields are required');
            }
        });

        await createCube(userId, req.body);

        res.redirect('/');
    } catch (error) {
        let errorMsg;

        if (error.errors) {
            Object.values(error.errors).forEach((x) => (errorMsg = x.properties?.message));
        } else {
            errorMsg = error.message;
        }

        res.render('create', { title: 'Create Cube - Cubicle', error: errorMsg });
    }
});

module.exports = createController;
