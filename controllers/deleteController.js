const { getCubeById, deleteCube } = require('../services/cubeService');

const deleteController = require('express').Router();

deleteController.get('/:cubeId', async (req, res) => {
    try {
        const user = req.user;

        const cubeId = req.params.cubeId;
        const cube = await getCubeById(cubeId);

        if (cube.creatorId == user.userId) {
            res.render('delete', { title: `Delete ${cube.name} - Cubicle`, cube, user });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        res.render('404', { title: 'Cubicle' });
    }
});

deleteController.post('/:cubeId', async (req, res) => {
    try {
        const user = req.user;
        const cubeId = req.params.cubeId;

        const cube = await getCubeById(cubeId);

        if (cube.creatorId == user.userId) {
            await deleteCube(cubeId);
        }

        res.redirect('/');
    } catch (error) {
        res.render('404', { title: 'Cubicle' });
    }
});

module.exports = deleteController;
