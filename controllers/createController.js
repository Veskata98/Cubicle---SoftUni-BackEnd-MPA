const { createCube } = require('../services/cubeService');
const { errorParser } = require('../utils/errorParser');

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
        const errorMessages = errorParser(error);
        res.render('create', { title: 'Create Cube - Cubicle', errorMessages, body: { ...req.body } });
    }
});

module.exports = createController;
