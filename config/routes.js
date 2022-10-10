const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const createController = require('../controllers/createController');
const detailsController = require('../controllers/detailsController');

const editController = require('../controllers/editController');
const deleteController = require('../controllers/deleteController');

const createAccessoryController = require('../controllers/createAccessoryController');
const attachController = require('../controllers/attachController');

const authController = require('../controllers/authController');

const errorController = require('../controllers/errorController');

//Middlewares
const { hasUser } = require('../middlewares/guards');

module.exports = (app) => {
    app.use(homeController);
    app.use('/about', aboutController);
    app.use('/create', hasUser, createController);
    app.use('/details', detailsController);

    app.use('/edit', hasUser, editController);
    app.use('/delete', hasUser, deleteController);

    app.use('/create/accessory', hasUser, createAccessoryController);
    app.use('/attach/accessory', hasUser, attachController);

    app.use('/auth', authController);

    app.use('*', errorController);
};
