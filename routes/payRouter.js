var express = require('express');
var router = express.Router();
const payController = require('../controllers/payController');

router.post('/create', payController.create)

module.exports = router;