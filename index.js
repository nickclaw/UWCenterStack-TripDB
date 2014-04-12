var mongoose = require('mongoose'),
    Manager = require('./lib/Manager.js');

module.exports = function(url, callback) {

    // connect to db
    mongoose.connect(url);

    mongoose.connection.on('err', function(err) {
        callback(err, null);
    });
    mongoose.connection
        .on('open', function(err) {
            callback(null, new Manager());
        })
        .on('err', callback.bind(null));
}
