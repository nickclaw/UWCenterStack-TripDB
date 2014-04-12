var mongoose = require('mongoose'),
    User = require('./User.js'),
    Trip = require('./Trip.js'),
    DataPoint = require('./DataPoint.js');

function Manager() {

}

Manager.prototype.User = User;
Manager.prototype.Trip = Trip;
Manager.prototype.DataPoint = DataPoint;

Manager.prototype.createUser = function(params, callback) {
    var user = new User(params);
    user.save(callback.bind(this));
}

Manager.prototype.addTrip = function(user, params, callback) {
    params.userId = user._id;
    var trip = new Trip(params);
    trip.save(callback.bind(this));
}

Manager.prototype.addPoint = function(trip, params, callback) {
    params.tripId = trip._id;
    var point = new DataPoint(params);
    point.save(callback.bind(this));
}

module.exports = Manager;
