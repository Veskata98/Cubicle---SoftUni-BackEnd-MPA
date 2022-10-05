const detailsController = require('express').Router();
const Cubic = require('../models/cubicModel');

detailsController.get('/:id', async (req, res) => {
    const cubicId = req.params.id;
    const cubic = await Cubic.findById(cubicId);

    res.render('details', { title: 'Cubicle', cubic });
});

module.exports = detailsController;
