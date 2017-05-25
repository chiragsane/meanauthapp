const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Schema
const QualificationSchema = mongoose.Schema({
    qualificationName: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
}),autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/meanauthdb");
autoIncrement.initialize(connection);
QualificationSchema.plugin(autoIncrement.plugin, 
    {model: 'Qualification',
     startAt: 1});
const qualification = module.exports = mongoose.model('Qualification', QualificationSchema);


module.exports.addQualification = function (newQualification, callback) {
    newQualification.save(callback);
}

module.exports.getQual = function(user, callback){
    const query = {user: user};
    return qualification.find(query, callback);
}

module.exports.editQual = function(newQualObj, callback){
    console.log(newQualObj.qualificationName);
    const query = {_id: newQualObj._id};
    return qualification.findOne(query, callback);
}

module.exports.delQual = function(id, callback){
   const query = {_id: id};
   console.log(id);
   return qualification.findOne(query, callback);
}
