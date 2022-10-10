const { getCubes } = require('../services/cubeService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    try {
        const [search, from, to] = Object.values(req.query).map((x) => x.trim());
        const cubes = await getCubes(search, from, to);

        const user = req.user;

        cubes.forEach((x) => (x.isOwner = user?.userId == x.creatorId));

        res.render('index', { title: 'Cubicle', cubes, search, from, to, user });
    } catch (error) {
        res.render('404', { title: 'Cubicle' });
    }
});

module.exports = homeController;
