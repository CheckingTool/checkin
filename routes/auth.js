var express = require('express');
var router = express.Router();

const controller = require('../controllers/authController');

/* GET home page. */
router.post('/', controller.signup);


module.exports = router;
