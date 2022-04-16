const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    }
});

userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

module.exports = User;