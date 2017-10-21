var express = require('express');
var router = express.Router();

const adminController = require('../controllers/adminController');

/* GET home page. */
router.get('/', adminController.crud);
router.post('/addteacher', adminController.addteacher);
router.post('/addlesson', adminController.addlesson);
router.post('/addgroup', adminController.addgroup);

router.post('/delteacher', adminController.delteacher);
router.post('/dellesson', adminController.dellesson);
router.post('/delgroup', adminController.delgroup);

module.exports = router;
