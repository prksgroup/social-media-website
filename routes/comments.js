const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');
const commentcontroller = require('../controllers/commentcontroller');
//const commentcontroller=require('../controllers/post_controller');
router.post('/create', passport.checkAuthentication, commentcontroller.create);

module.exports = router;