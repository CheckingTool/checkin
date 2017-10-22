var express = require('express');
var router = express.Router();

const profileController = require('../controllers/profileController');

function checkAuth(req, res, next) {
        if (req.session.isLoggedIn) {
            return next();
        } else {
            res.status(401);
            res.send('Login first, please');
        }
    };

/* GET home page. */
router.get('/', checkAuth, profileController.index);
router.post('/newlogin', profileController.newlogin);
router.post('/newname', profileController.newname);
router.post('/newemail', profileController.newemail);
router.post('/newpass', profileController.newpass);

module.exports = router;
