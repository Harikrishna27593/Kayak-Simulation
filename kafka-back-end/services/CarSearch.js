var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
function handle_request(msg, callback){

    var res = {};
    var i=0;
    try {
        console.log("In handle request:"+ JSON.stringify(msg));
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('CarListings');
            console.log(msg.place);
            coll.find({Place: msg.place}).toArray( function(err, cars){
                if (err) {
                    res.code = "401";
                    res.value = "Car details fetch unsuccessful";
                    callback(null, res);
                }
                else {
                    var resArr = [];
                    resArr = cars.map(function (file) {
                        var carsJSON = {};
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
        });
    }
    catch (e){
        res.code = "401";
        res.value = "Car details fetch unsuccessful";
        callback(null, res);
    }
}

exports.handle_request = handle_request;