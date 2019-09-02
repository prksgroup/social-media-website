const postuser = require('../models/post');


module.exports.create = function(req, res) {
    postuser.create({
        content: req.body.content,
        user: req.user.id
    }, function(err, post) {
        if (err) {
            console.log('errrrrr');
        }
        return res.redirect('back');
    })
}