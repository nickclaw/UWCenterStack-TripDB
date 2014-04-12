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
tripSchema.methods.calculate = function() {
    console.log('trip calculated!');
};

// make remove and calculate cascade down
tripSchema.pre('remove', function(next) {
    DataPoint.find({tripId : this._id}).remove(next);
});
tripSchema.pre('calculate', function(next) {
    // not cascading this yet, might not even need too
    next();
});

// finally export the Model
module.exports = mongoose.model('Trip', tripSchema);
