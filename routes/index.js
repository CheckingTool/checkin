var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController');
const indexController = require('../controllers/indexController');

function checkAuth(req, res, next) {
        if (req.session.isLoggedIn) {
            return next();
        } else {
            res.status(401);
            res.send('Please login first');
        }
    };


/* GET home page. */
router.get('/', authController.index);
router.get('/main', checkAuth, indexController.index);

module.exports = router;
