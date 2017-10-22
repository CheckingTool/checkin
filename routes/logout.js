var express = require('express');
var router = express.Router();

const logoutController = require('../controllers/logoutController');

/* GET home page. */
router.get('/', logoutController.logout);

module.exports = router;
