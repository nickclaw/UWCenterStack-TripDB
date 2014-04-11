// require
var User = require('./User.js');

/**
 * Constructor
 * @param Connection db
 */
function Manager(db) {
    this.db = db;
}

Manager.prototype.createUser = function(params, callback) {
    var user =  new User(params);
    user.save(callback);
}

module.exports = Manager;
