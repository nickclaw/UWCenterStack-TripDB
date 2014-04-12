var db = require('../index.js');

db('mongodb://127.0.0.1', function(err, manager) {
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

            // update calculations
            me.calculate(function() {
                me.remove();
            });
        });
    });
});
