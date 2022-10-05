const errorController = require('express').Router();

errorController.get('/', async (req, res) => {
    res.render('404', { title: 'Page Not Found' });
});

module.exports = errorController;
