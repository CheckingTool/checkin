var express = require('express');
var router = express.Router();

const checklistController = require('../controllers/checklistController');

/* GET home page. */
router.get('/', checklistController.index);
router.get('/misses', checklistController.misses);
router.post('/schedule', checklistController.schedule);
router.post('/feedback', checklistController.feedback);
module.exports = router;