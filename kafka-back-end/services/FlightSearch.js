var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
function handle_request(msg, callback){

    var res = {};
    var i=0;
    try {
        console.log("In handle request:"+ JSON.stringify(msg));
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('FlightListings');
            console.log(msg.placefrom);
            coll.find({Origin: msg.placefrom,Destination:msg.placeto,DepartureDate:{$gte:msg.departdate},ArrivalDate:{$lt:msg.arrivaldate}}).toArray( function(err, flights){

                if (err) {
                    res.code = "401";
                    res.value = "Flights details fetch unsuccessful";
                    callback(null, res);
                }
                else {
                    var resArr = [];
                    resArr = flights.map(function (file) {
                        var flightsJSON = {};
                        flightsJSON.id=flights[i].FlightId
                        flightsJSON.operator = flights[i].Operator;
                        flightsJSON.origin=flights[i].Origin;
                        flightsJSON.destination=flights[i].Destination;
                        //flightsJSON.doorCount=flights[i].Doors;
                        //flightsJSON.carPrice=flights[i].Price;
                        i=i+1;
                        return flightsJSON;

                    });
                    res.code = "200";
                    res.value = "FlightsListing Successful";
                    res.arr=resArr
                    console.log(resArr)
                    callback(null, res);
                }
            });
        });
    }
    catch (e){
        res.code = "401";
        res.value = "Flights details fetch unsuccessful";
        callback(null, res);
    }
}

exports.handle_request = handle_request;