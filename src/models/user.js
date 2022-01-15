const mongoose = require('mongoose');
const Util = require('util');
const bcrypt = require('bcrypt');
const roleSchema = require("./role");

const schema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
});

//schema.pre('save', async function (next) {
//    if (!this.password || !this.isModified('password')) {
//        return next();
//    }
//    try {
//        const hashedPassword = await hashAsync(this.password, 10);
//        this.password = hashedPassword;
//    } catch (err) {
//        next(err);
//    }
//});

schema.set('toJSON', {
    transform: (doc, ret, options) => ({
        id: ret._id,
        username: ret.username,
        email: ret.email,
        roles: ret.roles
    })
});

module.exports = mongoose.model("User", schema);