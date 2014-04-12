var mongoose = require('mongoose'),
    Trip = require('./Trip.js');

// create user schema
var userSchema = mongoose.Schema({
    firstName: {type:String, default: ""},
    lastName: {type:String, default: ""}
});

// define custom methods
userSchema.methods.calculate = function() {
    console.log('calculated user!');
};

// cascade delete and calculate
userSchema.pre('remove', function(next) {
    Trip.find({userId : this._id}).remove(next);
});
userSchema.pre('calculate', function(next) {
    Trip.find({userId : this._id}).stream()
        .on('data', function(doc) {
            doc.calculate();
        })
        .on('close', next);
});

var User = mongoose.model('User', userSchema);

module.exports = User;
