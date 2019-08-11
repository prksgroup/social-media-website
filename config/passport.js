const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const user = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done) {
        user.findOne({ email: email }, function(err, user) {
            if (err) {
                console.log('ERROR OCCURRED DURING EMAIL SEARCHING IN THE DATABASE')
                return done(err);
            }
            if (!user || user.password != password) {
                console.log('INVALID PASSWORD OR USER NOT FOUND');
                return done(null, false);
            }
            return done(null, user);
        })
    }
));

passport.serializeUser(function(user, done) {
    return done(null, user.id);
})
passport.deserializeUser(function(id, done) {
        user.findById(id, function(err, user) {
            if (err) {
                console.log('ERROR OCCURRED DURING EMAIL SEARCHING IN THE DATABASE')
                return done(err);
            }
            return done(null, user);
        })
    })
    //check if the user is authenticated
passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not sign in
    else {
        return res.redirect('/user/signin');
    }
}
passport.setAuthenticatedUser = function(req, res, next) {
    if (isAuthenticated) {
        //if user contains the current signed in session cookie so that we are sending it to locals for accessing the view

        req.locals.user = req.user;
    }

}

module.exports = passport;