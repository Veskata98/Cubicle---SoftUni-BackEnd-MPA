const attachController = require('express').Router();
const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

attachController.get('/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await Cube.findById(cubeId);

    const currentAccessories = cube.accessories.map((x) => x.toString());
    const accessories = await Accessory.find({}).then((a) => a.map((x) => x._id.toString()));

    const availableAccessoriesIds = accessories.filter((x) => !currentAccessories.includes(x));
    const availableAccessories = await Accessory.find({ _id: { $in: availableAccessoriesIds } });

    cube.availableAccessories = availableAccessories;

    res.render('attach', { title: 'Attach acceessories', cube });
});

attachController.post('/:id', async (req, res) => {
    const cubeId = req.params.id;
    const newlyAdded = req.body.accessory;

    const cube = await Cube.findById(cubeId);
    const acceessory = await Accessory.findById(newlyAdded);

    cube.accessories.push(newlyAdded);
    acceessory.cubes.push(cubeId);

    await cube.save();
    await acceessory.save();

    res.redirect(`/details/${cubeId}`);
});

module.exports = attachController;
