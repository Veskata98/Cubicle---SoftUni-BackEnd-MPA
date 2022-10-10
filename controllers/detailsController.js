const { getCubeById } = require('../services/cubeService');

const detailsController = require('express').Router();

detailsController.get('/:id', async (req, res) => {
    try {
        const cubeId = req.params.id;
        const cube = await getCubeById(cubeId);

        const userId = req.user?.userId;

        cube.isOwner = cube.creatorId == userId;

        res.render('details', { title: `${cube.name} - Cubicle`, cube });
    } catch (error) {
        res.render('404', { title: 'Cubicle' });
    }
});

module.exports = detailsController;
