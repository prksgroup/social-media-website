const mongoose = require('mongoose');

const postschema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }]
}, {
    timestamps: true
});

const post = mongoose.model('post', postschema);
module.exports = post;