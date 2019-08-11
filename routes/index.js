const express = require('express');

const homecontrol = require('../controllers/homecontrollers');

const router = express.Router();
router.get('/', homecontrol.home);
router.use('/user', require('./users'));
router.use('/user', require('./post'));

module.exports = router;