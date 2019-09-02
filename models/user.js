const mongoose = require('mongoose');
const userschema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});
const socialusers = mongoose.model('user', userschema);
module.exports = socialusers;