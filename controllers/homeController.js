const homeController = require('express').Router();
const fs = require('fs');

homeController.get('/', (req, res) => {
    const [search, from, to] = Object.values(req.query).map((x) => x.trim());

    fs.readFile('./config/database.json', async (err, data) => {
        if (err) throw Error(err);
        let cubics = await JSON.parse(data.toString());

        if (search) {
            cubics = cubics.filter((x) => x.name.includes(search));
        }

        if (from && to) {
            cubics = cubics.filter((x) => x.difficultyLevel >= from && x.difficultyLevel <= to);
        }

        res.render('index', { title: 'Cubicle', cubics, search, from, to });
    });
});

module.exports = homeController;
