const controllerdb = require('../models/user')
const postofsocial = require('../models/post');



module.exports.signup = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_up', {
        title: 'SOCIAL | SIGN UP'
    });
}
module.exports.signout = function(req, res) {
    return res.redirect('/user/signin');
}
module.exports.signin = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    return res.render('user_sign_in', {
        title: 'SOCIAL | SIGN IN'
    });
}

module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        console.log('PASSWORD IS NOT MATCHING WITH CONFIRM PASSWORD');
        return res.redirect('back');
    }
    controllerdb.findOne({ email: req.body.email }, function(err, user) {
        if (err) { console.log('error in finding same email as entered'); return; }

        if (!user) {
            controllerdb.create(req.body, function(err, user) {
                if (err) { console.log('error in creating the new user'); return; }
                return res.redirect('/user/signin');
            })
        } else {
            return res.redirect('back');
        }
    })

}


module.exports.createsession = function(req, res) {
    //find the user with email
    controllerdb.findOne({ email: req.body.email }, function(err, user) {
        if (err) { console.log('err in finding email'); return }
        //handle user found
        if (user) {
            if (user.password != req.body.password) {
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('cookie_id', user.id);
            return res.redirect('/');
        } else { //handle user is not found
            return res.redirect('back');
        }
    })

}

module.exports.profile = function(req, res) {
    if (req.cookies.cookie_id) {
        controllerdb.findById(req.cookies.cookie_id, function(err, user) {
            if (user) {
                res.render('user_profile', {
                    title: 'SOCIAL | PROFILE PAGE',
                    user: user

                })
            } else {
                res.redirect('back');
            }
        })
    } else {
        return res.redirect('/user/signin');
    }

}
module.exports.signoutcontroller = function(req, res) {
    req.logout();
    return res.redirect('/');
}












//comments------------------------------------->
//     console.log(req.cookies);
//     res.cookie('user_id', 'parthsharma');
//     if (req.cookies.user_id) {

//             console.log(req.cookies.user_id);
//             User.findOne(req.cookies.user_id, function(err, user) {
//             if (err) { console.log('DISCREPENCY IN SIGN IN USING COOKIES', err); return };
//             if (user) {
//                 return res.render('user_profile', {
//                     title: 'PROFILE',
//                     user: user
//                 })
//             } else {
//                 return res.redirect('/user/signin');
//             }
//         })
//     } else {
//         return res.redirect('/user/signin');
//     }




//comments------------------------------------->
//find the email exist or not
// User.findOne({ email: req.body.email }, function(err, user) {
//     if (err) { console.log('ERROR IN FINDING EMAIL OF THE USER'); }

//     if (user) {
//         //if email has found and now it's time to handle the query as fats as possible
//         if (user.password != req.body.password) {
//             res.redirect('back');
//         } else {
//             res.cookie('user_id', user.id)
//             res.redirect('/user/profile');
//         }
//     } else {
//         return res.redirect('back');
//     }
// })