var db = require('../index.js');

db.connect('mongodb://127.0.0.1', function(err, manager) {
    if (err) throw err;

    // create a new user
    manager.newUser({
        firstName: "Nicholas",
        lastName: "Clawson"
    }, function(err, me) {

        // add a trip to the user
        me.newTrip({
            start: {
                time: Date.now(),
                lat: 0.0,
                long: 0.0
            },
            end: {
                time: Date.now(),
                lat: 1.0,
                long: -1.0
            }
        }, function(err, trip) {

            addDataPoints(trip, function() {
                me.calculate(function() {
                    me.remove();
                })
            });
        });
    });
});


function addDataPoints(trip, callback) {
    var count = 0,
        interval = setInterval(function() {
            trip.newPoint({
                speed: Math.random(),
                lat: Math.random(),
                long: Math.random()
            }, function() {
                console.log(count);
                if (++count > 100) {
                    clearInterval(interval);
                    callback();
                }
            });
        }, 50);
}
