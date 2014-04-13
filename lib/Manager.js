var mongoose = require('mongoose'),
    User = require('./User.js'),
    Trip = require('./Trip.js'),
    DataPoint = require('./DataPoint.js');

function Manager(options) {
    this.options = options;
}

// export these also
Manager.prototype.User = User;
Manager.prototype.Trip = Trip;
Manager.prototype.DataPoint = DataPoint;

/**
 * Shortcut to create a user
 * @param object params
 * @param Closure callback
 */
Manager.prototype.newUser = function(params, callback) {
    var user = new User(params);
    user.save(callback);
}

module.exports = Manager;
