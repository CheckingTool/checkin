var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController');
const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', authController.index);
router.get('/main',indexController.index);

module.exports = router;
