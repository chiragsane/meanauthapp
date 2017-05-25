const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    }
});

const user = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    user.findById(id, callback);
}

module.exports.getUserByName = function(username, callback){
    const query = {username: username};
    user.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            if(err) throw err;
            newUser.password= hash;
            newUser.save(callback);
        });
    });    
}

module.exports.comparepwd = function(cand_pwd, hash, callback){
    bcrypt.compare(cand_pwd, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
}