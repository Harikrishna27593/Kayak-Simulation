var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
function handle_request(msg, callback){
    var res = {};
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('FlightListings');

        coll.findOne({FlightId: msg.FlightId, Operator:msg.Operator, DepartureTime:msg.depttime ,DepartureDate:msg.departdate,ArrivalTime: msg.arrivaltime, ArrivalDate:msg.arrivaldate, Origin:msg.placefrom,Destination:msg.placeto}, function(err,flight){
            if (flight) {
                console.log("Flight Listing Already Exists");
                res.code = "500";
                res.value = "Flight Listing Already Exists";
                console.log("2: "+res.code);
                callback(null, res);

            } else {

                coll.insertOne({FlightId: msg.FlightId, Operator:msg.Operator, DepartureTime:msg.depttime ,DepartureDate:msg.departdate,ArrivalTime: msg.arrivaltime, ArrivalDate:msg.arrivaldate, Origin:msg.placefrom,Destination:msg.placeto},{w: 1}, function(err, flight){
                    if (flight.insertedCount>0) {

                        console.log("New Flight Listing Added");
                        //res.redirect(201,'/login');
                        res.code = "201";
                        res.value = "Success Flight Listing";


                    } else {
                        //res.status(400);
                        console.log("New Flight Listing failed");
                        res.code = "400";
                        res.value = "failure New Flight Listing";
                    }
                    console.log("1: "+res.code);
                    callback(null, res);
                });
            }

        });


    });

}

exports.handle_request = handle_request;
