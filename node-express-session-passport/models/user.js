const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    // Passport module
    // automatically insert username and password
    
    admin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('user', UserSchema);
module.exports = User;