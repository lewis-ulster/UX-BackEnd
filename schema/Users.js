const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    min: 1,
    max: 255
    },
    email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    min: 6,
    max: 255
    },
    password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
    },
    date: {
    type: Date,
    default: Date.now
    }
});
const User = mongoose.model('User', UserSchema);
module.exports = User;