const express = require('express');
const handlebars = require('express-handlebars').create({ extname: '.hbs' });

module.exports = (app) => {
    //TODO: Setup the view engine
    app.engine('hbs', handlebars.engine);
    app.set('view engine', 'hbs');

    //TODO: Setup the body parser
    app.use(express.urlencoded({ extended: true }));

    //TODO: Setup the static files
    app.use('/static', express.static('static'));
};
