const authController = require('express').Router();

const { isGuest, hasUser } = require('../middlewares/guards');
const { login, register } = require('../services/authService');

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
        res.render('login', { title: 'Login - Cubicle', error: error.message, username });
    }
});

//REGISTER
/////////////////////////////

authController.get('/register', isGuest, (req, res) => {
    res.render('register', { title: 'Register - Cubicle' });
});

authController.post('/register', isGuest, async (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const repass = req.body.repeatPassword.trim();

    try {
        if (username == '' || password == '') {
            throw new Error('All fields are required');
        }

        if (password !== repass) {
            throw new Error('Password do not match');
        }

        const userData = await register(username, password);
        attachToken(req, res, userData);

        res.redirect('/');
    } catch (error) {
        res.render('register', { title: 'Register - Cubicle', error: error.message, username });
    }
});

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
