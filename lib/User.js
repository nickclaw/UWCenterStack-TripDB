var mongoose = require('mongoose'),
    Trip = require('./Trip.js');

// create user schema
var userSchema = mongoose.Schema({
    firstName: {type:String, default: ""},
    lastName: {type:String, default: ""}
});

// define custom methods

/**
 * Updates the user stats based off of child trips
 * @param Closure callback
 */
userSchema.methods.calculate = function(callback) {
    console.log('calculated user: '+this._id);
    callback && callback();
};

/**
 * Creates a new trip linked to the user
 * @param object params
 * @param Closure callback
 */
userSchema.methods.newTrip = function(params, callback) {
    params.userId = this._id;
    (new Trip(params)).save(callback);
}

// cascade delete and calculate
userSchema.pre('remove', function(next) {
    console.log('removing trips from user: '+ this._id);
    Trip.find({userId : this._id}).remove(next);
});
userSchema.pre('calculate', function(next) {
    Trip.find({userId : this._id}).stream()
        .on('err', function(err) {
            console.log(error);
            next();
        })
        .on('data', function(doc) {
            doc.calculate();
        })
        .on('close', function() {
            next();
        });
});

var User = mongoose.model('User', userSchema);

module.exports = User;
