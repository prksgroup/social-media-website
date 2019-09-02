const express = require('express');

const usercontroller = require('../controllers/user_controller');

const passport = require('passport');
const router = express.Router();

//make the profile page accessable only when the user is authenticated or signed in



router.get('/profile', passport.checkAuthentication, usercontroller.profile);
router.get('/signup', usercontroller.signup);
router.get('/signin', usercontroller.signin);
router.get('/signout', usercontroller.signout);
router.post('/create', usercontroller.create);

router.post('/create-session', passport.authenticate('local', { failureRedirect: '/user/signin' }), usercontroller.createsession);

router.get('/sign-out', usercontroller.signoutcontroller);

module.exports = router;




















// router.post('/create-session', passport.authenticate('local', { failureRedirect: '/user/signin' }), usercontroller.createsession);

// router.post('/create-session', usercontroller.createsession);