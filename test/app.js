var db = require('../index.js');

db('mongodb://127.0.0.1', function(err, manager) {
    if (err) throw err;

    manager.createUser({
        firstName: "Nicholas",
        lastName: "Clawson"
    }, function(err, me) {
        manager.addTrip(me, {
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
            me.calculate();
        });
    });
});
