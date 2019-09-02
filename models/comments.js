const mongoose = require('mongoose');
const commentschema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

}, {
    timestamps: true
})
const comment = mongoose.model('commentofusers', commentschema);
module.exports = comment;