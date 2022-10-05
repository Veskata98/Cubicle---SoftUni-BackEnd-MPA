const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const createController = require('../controllers/createController');
const detailsController = require('../controllers/detailsController');
const errorController = require('../controllers/errorController');
const createAccessoryController = require('../controllers/createAccessoryController');
const attachController = require('../controllers/attachController');

module.exports = (app) => {
    app.use(homeController);
    app.use('/about', aboutController);
    app.use('/create', createController);
    app.use('/details', detailsController);

    app.use('/create/accessory', createAccessoryController);
    app.use('/attach/accessory', attachController);

    app.use('*', errorController);
};
