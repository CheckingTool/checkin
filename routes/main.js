var express = require('express');
var router = express.Router();

//const authController = require('../controllers/authController');
const mainController = require('../controllers/mainController');

/* GET home page. */
/*router.get('/', authController.index);*/
router.get('/check', mainController.check);

module.exports = router;