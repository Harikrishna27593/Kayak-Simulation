var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('FlightListings');
    var res = {};
    var updateJson={FlightId: msg.FlightId, Operator:msg.Operator, DepartureTime:msg.depttime ,DepartureDate:msg.departdate,ArrivalTime: msg.arrivaltime, ArrivalDate:msg.arrivaldate, Origin:msg.placefrom,Destination:msg.placeto};
    coll.update({FlightId: msg.InitialFlightId},{$set : updateJson},function(err, flights) {
                if (flights) {

                    console.log("Flight Listing updated");
                    //res.redirect(201,'/login');
                    res.code = "201";
                    res.value = "Success Flight updation";
                } else {
                    console.log("Flight updation failed");
                    res.code = "400";
                    res.value = "failure Flight updation";
                }
                console.log("1: " + res.code);
                callback(null, res);
            })
})
}

exports.handle_request = handle_request;
