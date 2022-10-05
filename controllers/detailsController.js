const detailsController = require('express').Router();
const Cube = require('../models/Cube');

detailsController.get('/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await Cube.findById(cubeId).populate('accessories');
    console.log(cube);

    res.render('details', { title: 'Cube', cube });
});

module.exports = detailsController;
