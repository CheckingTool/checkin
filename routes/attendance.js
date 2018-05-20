const express = require('express');
const router = express.Router();

const attendanceController = require('../controllers/attendanceController');

function checkAuth(req, res, next) {
        if (req.session.isLoggedIn) {
            return next();
        } else {
            res.status(401);
            res.send('Login first');
        }
    };


/* GET home page. */
router.get('/', checkAuth,  attendanceController.index);
router.post('/list', attendanceController.list);
module.exports = router;