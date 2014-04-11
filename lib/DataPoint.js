var mongoose = require('mongoose');

var dataPointSchema = mongoose.Schema({
    tripId: ObjectId,
    speed: Number,
    lat: Number,
    long: Number,
    timestamp: {type: Date, default: Date.now}
});

var DataPoint = mongoose.Model('DataPoint', dataPointSchema);

module.exports = DataPoint;
