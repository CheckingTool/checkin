var express = require('express');
var router = express.Router();

const checklistController = require('../controllers/checklistController');

function checkAuth(req, res, next) {
        if (req.session.isLoggedIn) {
            return next();
        } else {
            res.status(401);
            res.send('Login first, please');
        }
    };

/* GET home page. */
router.get('/', checkAuth, checklistController.index);
router.get('/misses', checklistController.misses);
router.get('/alert', checklistController.alert);
router.post('/schedule', checklistController.schedule);
router.post('/feedback', checklistController.feedback);
module.exports = router;