const homeController = require('express').Router();
const Cubic = require('../models/cubicModel');

homeController.get('/', async (req, res) => {
    const [search, from, to] = Object.values(req.query).map((x) => x.trim());

    let cubics = await Cubic.find({
        name: { $regex: search || '', $options: 'i' },
        difficultyLevel: { $gte: from || 1, $lte: to || 6 },
    });

    res.render('index', { title: 'Cubicle', cubics, search, from, to });
});

module.exports = homeController;
