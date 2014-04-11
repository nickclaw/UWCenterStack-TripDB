var mongoose = require('mongoose'),
    trip = require('./Trip.js');

var userSchema = mongoose.Schema({
    firstName: {type:String, default: ""},
    lastName: {type:String, default: ""}
});

userSchema.methods.addTrip(params, callback) {
    trip = new Trip(params);
    trip.save(callback);
}

var User = mongoose.Model('User', userSchema);

module.exports = User;
