const jwt = require('jsonwebtoken');

module.exports = (jwtSecret) => (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        try {
            const userData = jwt.verify(token, jwtSecret);
            req.user = userData;
        } catch (error) {
            res.clearCookie('jwt');
            return res.redirect('/auth/login');
        }
    }

    req.signJwt = (data) => jwt.sign(data, jwtSecret, { expiresIn: '4h' });

    next();
};
