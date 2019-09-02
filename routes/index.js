const express = require('express');

const homecontrol = require('../controllers/homecontroller');

const router = express.Router();
router.get('/', homecontrol.hometry);
router.use('/user', require('./users'));
router.use('/post', require('./post'));
router.use('/comments', require('./comments'));
module.exports = router;