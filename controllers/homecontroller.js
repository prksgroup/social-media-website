const postofsocial = require('../models/post');
module.exports.hometry = function(req, res) {
    // postofsocial.find({}, function(err, posts) {
    //         if (err) {
    //             console.log('Posting error');
    //         }
    //         return res.render('home', {
    //             title: "SOCIAL | Home",
    //             posts: posts
    //         })
    //     })
    postofsocial.find({}).populate('user').exec(function(err, posts) {
            if (err) {
                console.log('ERROR IN USER SCHEMA POPULATING', err);
            }
            return res.render('home', {
                title: 'SOCIAL | HOME',
                posts: posts
            })
        })
        // postofsocial.find({})
        //     .populate('user')
        //     .populate({
        //         path: 'comments',
        //         populate: {
        //             path: 'user'
        //         }
        //     }).exec(function(err, posts) {
        //         if (err) {
        //             console.log('Posting error', err);
        //         }
        //         console.log(posts);
        //         return res.render('home', {
        //             title: "SOCIAL | Home",
        //             posts: posts
        //         })
        //     });
}