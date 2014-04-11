require('./lib/Manager.js')

module.exports = function(mongoose, callback) {
    if (!mongoose) {
        throw "Missing argument 1";
    }

    mongoose.db.on('err', function(err) {
        callback(err, null);
    });
    mongoose.db.on('open', function() {
        manager = new Manager();
        callback(null, manager);
    });
}
