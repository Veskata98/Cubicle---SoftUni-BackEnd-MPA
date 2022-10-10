const express = require('express');
const handlebars = require('express-handlebars').create({ extname: '.hbs' });
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');
const userNav = require('../middlewares/userNav');

const jwtSecret = '823u8F$943ru4398U$yr734g9fewasmcxznvbk';

module.exports = (app) => {
    //TODO: Setup the view engine
    app.engine('hbs', handlebars.engine);
    app.set('view engine', 'hbs');

    //TODO: Setup the body parser
    app.use(express.urlencoded({ extended: true }));

    //Middlewares
    app.use(cookieParser());
    app.use(auth(jwtSecret));
    app.use(userNav());

    //TODO: Setup the static files
    app.use('/static', express.static('static'));
};
