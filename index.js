var mongoose = require('mongoose'),
    Manager = require('./lib/Manager.js');


function Db() {};

/**
 *
 *
 */
Db.prototype.connect = function(url, options, callback) {
    // make options optional
    if (typeof options === 'function') {
        callback = options;
        options = {}
    }

    // connect to db
    mongoose.connect(url);

    mongoose.connection.on('err', function(err) {
        callback(err, null);
    });
    mongoose.connection
        .on('open', function(err) {
            callback(null, new Manager(options));
        })
        .on('err', callback.bind(null));
}


module.exports = new Db();
