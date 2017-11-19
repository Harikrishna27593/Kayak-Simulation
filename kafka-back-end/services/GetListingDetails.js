var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
function handle_request(msg, callback){
    var res = {};
    try {
        console.log("In handle request:"+ JSON.stringify(msg));
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);
            switch (msg.Type){
                case 'Hotel':
                    var coll = mongo.collection('HotelListings');

                    coll.findOne({HotelId: msg.ID}).toArray( function(err,hotels){
                        if (err) {
                            res.code = "401";
                            res.value = "Listing not available";
                            callback(null, res);
                        }
                        // else {
                        //     var resArr = [];
                        //     resArr = hotels.map(function (file) {
                        //         var hotelsJSON = {};
                        //         hotelsJSON.id=cars[i].CarId
                        //         hotelsJSON.carType = cars[i].CarType;
                        //         hotelsJSON.place = cars[i].Place;
                        //         // carsJSON.carName=cars[i].CarName;
                        //         hotelsJSON.peopleCount=cars[i].People;
                        //         hotelsJSON.bagCount=cars[i].Bags;
                        //         hotelsJSON.doorCount=cars[i].Doors;
                        //         hotelsJSON.carPrice=cars[i].Price;
                        //         // carsJSON.carCompany=cars[i].CarCompany;
                        //         i=i+1;
                        //         return hotelsJSON;
                        //
                        //     });
                        //     res.code = "200";
                        //     res.value = "CarListing Successful";
                        //     res.arr=resArr
                        //     console.log(resArr)
                        //     callback(null, res);
                        // }
                    });
                    break;

                case 'Flight':
                    var coll = mongo.collection('FlightListings');

                    coll.findOne({FlightID: msg.ID}).toArray( function(err, flights){
                        if (err) {
                            res.code = "401";
                            res.value = "Listing not available";
                            callback(null, res);
                        }

                        else {
                            i=0
                            var resArr = [];
                            resArr = flights.map(function (file) {
                                var flightsJSON = {};
                                flightsJSON.Type='Flight'
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

                    break;

                case 'Car':
                    var coll = mongo.collection('CarListings');

                    coll.findOne({CarId: msg.ID}).toArray( function(err,cars){
                        if (err) {
                            res.code = "401";
                            res.value = "Listing not available";
                            callback(null, res);
                        }
                        else {
                            var resArr = [];
                            i=0;
                            resArr = cars.map(function (file) {
                                var carsJSON = {};
                                carsJSON.Type='Car'
                                carsJSON.id=cars[i].CarId
                                carsJSON.carType = cars[i].CarType;
                                carsJSON.place = cars[i].Place;
                                // carsJSON.carName=cars[i].CarName;
                                carsJSON.peopleCount=cars[i].People;
                                carsJSON.bagCount=cars[i].Bags;
                                carsJSON.doorCount=cars[i].Doors;
                                carsJSON.carPrice=cars[i].Price;
                                // carsJSON.carCompany=cars[i].CarCompany;
                                i=i+1;
                                return carsJSON;

                            });
                            res.code = "200";
                            res.value = "CarListing Successful";
                            res.arr=resArr
                            console.log(resArr)
                            callback(null, res);
                        }
                    });
            }

        });
    }
    catch (e){
        res.code = "401";
        res.value = "Listing not available";
        callback(null, res);
    }

}

exports.handle_request = handle_request;