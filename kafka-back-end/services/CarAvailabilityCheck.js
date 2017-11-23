var MongoConPool=require("./MongoConPool");

function handle_request(msg, callback){
    var res = {};
    try {
        console.log("In handle request:"+ JSON.stringify(msg));
var queryJson={Place: msg.place};
        MongoConPool.find('CarListings',queryJson,function(err, car){
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
    }
    catch (e){
        res.code = "401";
        res.value = "Cars not available";
        callback(null, res);
    }
}

exports.handle_request = handle_request;