const detailsController = require('express').Router();
const fs = require('fs');

detailsController.get('/:id', async (req, res) => {
    fs.readFile('./config/database.json', async (err, data) => {
        if (err) throw Error(err);

        const itemId = req.params.id;
        const records = await JSON.parse(data.toString());

        const cubic = records.find((x) => x._id == itemId);

        res.render('details', { title: 'Cubicle', cubic });
    });
});

module.exports = detailsController;
