var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
function handle_request(msg, callback){
    var res = {};
    try {
        console.log("In handle request:"+ JSON.stringify(msg));
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('CarListings');
            console.log('-------------------------------------------');
            console.log(msg.place);
            coll.find({Place: msg.place}).toArray( function(err, car){
                // In case of any error return
                console.log(car);
                if (err) {
                    res.code = "401";
                    res.value = "Cars not available";
                    callback(null, res);
                }

                if (car.length>0) {
                    res.code = "204";
                    res.value = "Cars available";
                    callback(null, res);
                } else {
                    res.code = "401";
                    res.value = "Cars not available";
                    callback(null, res);
                }
            });


        });
    }
    catch (e){
        res.code = "401";
        res.value = "Cars not available";
        callback(null, res);
    }

}

exports.handle_request = handle_request;