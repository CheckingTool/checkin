var express = require('express');
var router = express.Router();

const adminController = require('../controllers/adminController');

function checkAuth(req, res, next) {
        if (req.session.admin) {
            return next();
        } else {
            res.status(401);
            res.send('You are not admin');
        }
    };

/* GET home page. */
router.get('/', adminController.renderPage);
router.post('/addteacher', adminController.addteacher);
router.post('/addlesson', adminController.addlesson);
router.post('/addgroup', adminController.addgroup);

router.post('/delteacher', adminController.delteacher);
router.post('/dellesson', adminController.dellesson);
router.post('/delgroup', adminController.delgroup);

module.exports = router;
