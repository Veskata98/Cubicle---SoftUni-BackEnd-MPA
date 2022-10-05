const homeController = require('express').Router();
const Cube = require('../models/Cube');

homeController.get('/', async (req, res) => {
    const [search, from, to] = Object.values(req.query).map((x) => x.trim());

    let cubes = await Cube.find({
        name: { $regex: search || '', $options: 'i' },
        difficultyLevel: { $gte: from || 1, $lte: to || 6 },
    });

    res.render('index', { title: 'Cube', cubes, search, from, to });
});

module.exports = homeController;
