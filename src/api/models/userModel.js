const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    password: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);