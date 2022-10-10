const { getCubeById } = require('../services/cubeService');

const editController = require('express').Router();

editController.get('/:cubeId', async (req, res) => {
    try {
        const user = req.user;

        const cubeId = req.params.cubeId;
        const cube = await getCubeById(cubeId);

        if (cube.creatorId == user.userId) {
            res.render('edit', { title: `Edit ${cube.name} - Cubicle`, cube, user });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        res.render('404', { title: 'Cubicle' });
    }
});

editController.post('/:cubeId', async (req, res) => {
    try {
        const user = req.user;

        const cubeId = req.params.cubeId;
        const isLeanedData = false;

        const cube = await getCubeById(cubeId, isLeanedData);

        if (cube.creatorId == user.userId) {
            cube.name = req.body.name.trim();
            cube.description = req.body.description.trim();
            cube.imageUrl = req.body.imageUrl.trim();
            cube.difficultyLevel = req.body.difficultyLevel.trim();

            await cube.save();
            res.redirect(`/details/${cubeId}`);
        } else {
            res.redirect('/');
        }
    } catch (error) {
        res.render('404', { title: 'Cubicle' });
    }
});

module.exports = editController;
