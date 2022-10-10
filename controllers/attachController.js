const attachController = require('express').Router();

const { getAvailableAccessories, getAccessories, getAccessoryById } = require('../services/accessoryService');
const { getCubeById } = require('../services/cubeService');

attachController.get('/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await getCubeById(cubeId);

    const userId = req.user.userId;

    if (userId == cube.creatorId) {
        const currentAccessoriesIds = cube.accessories.map((x) => x._id.toString());
        const allAccessoriesIds = (await getAccessories()).map((x) => x._id.toString());
        const availableAccessoriesIds = allAccessoriesIds.filter((x) => !currentAccessoriesIds.includes(x));

        const availableAccessories = await getAvailableAccessories(availableAccessoriesIds);
        cube.availableAccessories = availableAccessories;

        res.render('attach', { title: 'Attach acceessories - Cubicle', cube });
    } else {
        res.redirect('/');
    }
});

attachController.post('/:id', async (req, res) => {
    const cubeId = req.params.id;
    const newAccessoryId = req.body.accessory;
    const isLeanedData = false;

    try {
        const cube = await getCubeById(cubeId, isLeanedData);
        const acceessory = await getAccessoryById(newAccessoryId, isLeanedData);

        cube.accessories.push(newAccessoryId);
        acceessory.cubes.push(cubeId);

        await cube.save();
        await acceessory.save();

        res.redirect(`/details/${cubeId}`);
    } catch (error) {
        console.log(error.message);
        res.render('404', { title: 'Attachment Error - Cubicle' });
    }
});

module.exports = attachController;
