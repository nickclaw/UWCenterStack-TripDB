var mongoose = require('mongoose'),
    DataPoint = require('./DataPoint.js');

var tripSchema = mongoose.Schema({
    userId: ObjectId,
    start: {
        time: {type: Date, default: Date.now},
        lat: Number,
        long: Number
    },
    end: {
        time: Date,
        lat: Number,
        long: Number
    }
});

tripSchema.methods.addDataPoint = function(params, callback) {
    point = new DataPoint(params);
    point.save(callback);
}

var Trip = mongoose.Model('Trip', tripSchema);

module.exports = Trip;
