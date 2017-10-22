var express = require('express');
var router = express.Router();

const regController = require('../controllers/regController');

function checkAuth(req, res, next) {
        if (!req.session.isLoggedIn) {
            return next();
        } else {
            res.status(401);
            //res.send('Please log in');
            res.send('You are already logged in, so you cant watch this');
        }
    };

/* GET home page. */
router.get('/', checkAuth, regController.index);
router.post('/register', regController.register);
module.exports = router;
