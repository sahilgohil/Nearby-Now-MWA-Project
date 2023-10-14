const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const userSchema = new Schema({
    firstname: {
        type:String,
        required: true
    },
    lastname: {
        type:String,
        required: true
    },
    username: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
})

const User = mongoose.model('User',userSchema);

module.exports = {User};
