var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
function handle_request(msg, callback){
    var res = {};
    try {
        console.log("In handle request:"+ JSON.stringify(msg));
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('FlightListings');
            console.log('-------------------------------------------')
            console.log(msg.placefrom);
            coll.find({Origin: msg.placefrom,Destination:msg.placeto,DepartureDate:{$gte:msg.departdate},ArrivalDate:{$lt:msg.arrivaldate}}).toArray( function(err, flight){
                // In case of any error return
     console.log('------------------');
                console.log(flight.length);
                console.log('------------------');
                if (err) {
                    res.code = "401";
                    res.value = "Flights not available";
                    callback(null, res);
                }

                if (flight.length>0) {

                    res.code = "204";
                    res.value = "Flights available";
                    callback(null, res);
                } else {
                    res.code = "401";
                    res.value = "Flights not available";
                    callback(null, res);
                }
            });


        });
    }
    catch (e){
        res.code = "401";
        res.value = "Flights not available";
        callback(null, res);
    }

}

exports.handle_request = handle_request;