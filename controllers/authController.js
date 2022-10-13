const authController = require('express').Router();

const { body, validationResult } = require('express-validator');
const { isGuest, hasUser } = require('../middlewares/guards');
const { login, register } = require('../services/authService');
const { errorParser } = require('../utils/errorParser');

//LOGIN
/////////////////////////////

authController.get('/login', isGuest, (req, res) => {
    res.render('login', { title: 'Login - Cubicle' });
});

authController.post('/login', isGuest, async (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    try {
        if (username == '' || password == '') {
            throw new Error('All fields are required');
        }

        const userData = await login(username, password);
        attachToken(req, res, userData);

        res.redirect('/');
    } catch (error) {
        const errorMessages = errorParser(error);
        res.render('login', { title: 'Login - Cubicle', errorMessages, username });
    }
});

//REGISTER
/////////////////////////////

authController.get('/register', isGuest, (req, res) => {
    res.render('register', { title: 'Register - Cubicle' });
});

authController.post(
    '/register',
    isGuest,
    body('username').trim().isAlphanumeric('en-US').withMessage('Username must contain only latin letters and digits'),
    body('password')
        .trim()
        .isAlphanumeric('en-US')
        .withMessage('Password must contain only latin letters and digits')
        .isLength({ min: 8 })
        .withMessage('Password must be atleast 8 characters long'),
    async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const repass = req.body.repeatPassword;

        try {
            if (username == '' || password == '') {
                throw new Error('All fields are required');
            }

            if (password !== repass) {
                throw new Error('Password do not match');
            }

            const errors = validationResult(req)
                .array()
                .map((x) => x.msg)
                .join('\n');

            if (errors) {
                throw new Error(errors);
            }

            const userData = await register(username, password);
            attachToken(req, res, userData);

            res.redirect('/auth/register');
        } catch (error) {
            const errorMessages = errorParser(error);
            res.render('register', { title: 'Register - Cubicle', errorMessages, username });
        }
    },
);

//LOGOUT
/////////////////////////////

authController.get('/logout', hasUser, (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
});

//TOKEN ATTACHMENT
/////////////////////////////

const attachToken = (req, res, data) => {
    const token = req.signJwt(data);
    res.cookie('jwt', token, { maxAge: 14400000 });
};

module.exports = authController;
