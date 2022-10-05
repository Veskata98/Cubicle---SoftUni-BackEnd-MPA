const createCubic = require('../models/cubicModel');
const fs = require('fs');

const createController = require('express').Router();

const filename = './config/database.json';

let data = fs.readFileSync(filename);

if (data == '') {
    data = [];
} else {
    data = JSON.parse(data);
}

createController.get('/', (req, res) => {
    res.render('create', { title: 'Create Cube Page' });
});

createController.post('/', (req, res) => {
    const result = createCubic(req.body);
    data.push(result);

    try {
        fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
            if (err != null) {
                throw new Error();
            }
        });
        res.redirect('/');
    } catch (error) {
        res.render('404', { title: 'Form not passed' });
    }
});

module.exports = createController;
