const passport = require('passport');
const controllerdb = require('../models/user');
const localstrategy = require('passport-local').Strategy;

passport.use(new localstrategy({
        usernameField: 'email'
    },
    function(email, password, done) {
        controllerdb.findOne({ email: email }, function(err, user) {
            if (err) {
                console.log('error in matching the email of the user');
                return done(err);
            }
            if (!user || user.password != password) {
                console.log('INVALID CREDENTIALS');
                return done(null, false);
            } else {
                return done(null, user);
            }
        });
    }

));


//serializing the user
passport.serializeUser(function(user, done) {
    return done(null, user.id);
})


//deserializing the user 
passport.deserializeUser(function(id, done) {
    controllerdb.findById(id, function(err, user) {
        if (err) {
            console.log('error in deserializing');
            return done(err);
        }
        return done(null, user);
    })
})

passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/user/signin');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        console.log('THIS IS CALLED SUCCESSFULLY');
    }
    return next();
}


module.exports = passport;