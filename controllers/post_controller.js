const postuser = require('../models/post');
const Comment = require('../models/comments');

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

module.exports.destroy = function(req, res) {
    postuser.findById(req.params.id, function(err, post) {
        console.log(post.user);
        console.log(req.user.id);
        if (post.user == req.user.id) {
            post.remove();

            Comment.deleteMany({ post: req.params.id }, function(err) {
                if (err) { console.log('ERROR IN DELETING POST AND COMMENTS') } else {
                    return res.redirect('back');
                }
            })

        } else {
            return res.redirect('back');
        }
    })
}
