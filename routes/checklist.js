var express = require('express');
var router = express.Router();

const checklistController = require('../controllers/checklistController');

/* GET home page. */
router.get('/', checklistController.index);
router.get('/lessons', checklistController.lessons);
router.post('/schedule', checklistController.schedule);
module.exports = router;