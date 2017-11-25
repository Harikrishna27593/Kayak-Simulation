var mongo = require("./mongo");
var MongoConPool=require("./MongoConPool");
var mongoURL = "mongodb://localhost:27017/KAYAK";
var winston = require('winston');

function handle_request(msg, callback){

    winston.remove(winston.transports.File);
    winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    winston.log('info', 'Flight Page Viewed', { page_name : 'Flights_page'});


    var res = {};
    var i=0;
    try {

            var queryJson={Origin: msg.placefrom,Destination:msg.placeto,DepartureDate:msg.departdate};

            MongoConPool.find('FlightListings',queryJson,function(err, flights){
                if (err) {
                    res.code = "401";
                    res.value = "Flights details fetch unsuccessful";
                    callback(null, res);
                }
                else {
                    var resArr = [];
                    resArr = flights.map(function (file) {
                        var flightsJSON = {};
                        flightsJSON.id=flights[i].FlightId;
                        flightsJSON.operator = flights[i].Operator;
                        flightsJSON.origin=flights[i].Origin;
                        flightsJSON.destination=flights[i].Destination;
                        //flightsJSON.doorCount=flights[i].Doors;
if(msg.flightCabin=="Business")
                        flightsJSON.flightPrice=flights[i].Business;
else if(msg.flightCabin=="FirstClass")
    flightsJSON.flightPrice=flights[i].FirstClass;
else
    flightsJSON.flightPrice=flights[i].Economy;
                        flightsJSON.DepartureDate=flights[i].DepartureDate;
                        flightsJSON.DepartureTime=flights[i].DepartureTime;
                        flightsJSON.ArrivalDate=flights[i].ArrivalDate;
                        flightsJSON.ArrivalTime=flights[i].ArrivalTime;
flightsJSON.type=flights[i].Type;
flightsJSON.JourneyTime=flights[i].TotalTime;
                        i=i+1;
                        return flightsJSON;
                    });
                    res.code = "200";
                    res.value = "FlightsListing Successful";
                    res.arr=resArr;
                    console.log('---------------');
                    console.log(res);
                    console.log('---------------');
                    callback(null, res);
                }
            });

    }
    catch (e){
        res.code = "401";
        res.value = "Flights details fetch unsuccessful";
        callback(null, res);
    }
}

exports.handle_request = handle_request;