var express = require('express');
var router = express.Router();

const controller = require('../controllers/authController');

function checkAuth(req, res, next) {
        if (!req.session.isLoggedIn) {
            return next();
        } else {
            res.status(401);
            res.send('You are already logined');
        }
    };

/* GET home page. */
router.get('/', checkAuth, controller.index);
router.post('/', controller.signup);
module.exports = router;
