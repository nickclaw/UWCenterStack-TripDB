var mongoose = require('mongoose'),
    manager = require('./lib/Manager.js');

module.exports = function(url, callback) {

    // connect to db
    mongoose.connect(url);

    mongoose.connection.on('err', function(err) {
        callback(err, null);
    });
    mongoose.connection
        .on('open', function(err) {
            callback(null, manager);
        })
        .on('err', callback.bind(null));
}
