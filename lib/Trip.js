var mongoose = require('mongoose'),
    DataPoint = require('./DataPoint.js');

// create trip schema
var tripSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
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


// define custom methods

/**
 * Updates the user stats based off of child trips
 * @param Closure callback
 */
tripSchema.methods.calculate = function(callback) {
    console.log('calculated trip: '+this._id);
    callback && callback(null, this);
};

/**
 * Adds a DataPoint to the trip
 * @param object params
 * @param Closure callback
 */
tripSchema.methods.newPoint = function(params, callback) {
    params.tripId = this._id;
    (new DataPoint()).save(callback);
};

// make remove and calculate cascade down
tripSchema.pre('remove', function(next) {
    console.log('removing datapoints from user: ' + this._id);
    DataPoint.find({tripId : this._id}).remove(next);
});
tripSchema.pre('calculate', function(next) {
    // not cascading this yet, might not even need too
    next();
});

// finally export the Model
module.exports = mongoose.model('Trip', tripSchema);
