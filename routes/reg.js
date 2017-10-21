var express = require('express');
var router = express.Router();

const regController = require('../controllers/regController');

/* GET home page. */
router.get('/', regController.index);
router.post('/register', regController.register);
module.exports = router;
