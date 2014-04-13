var mongoose = require('mongoose');

var dataPointSchema = mongoose.Schema({
    tripId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    speed: Number,
    lat: Number,
    long: Number,
    timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('DataPoint', dataPointSchema);
