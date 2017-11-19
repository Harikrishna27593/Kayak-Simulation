var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
function userdetails(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    mongo.connect(mongoURL, function(){

        var coll = mongo.collection('Users');
        coll.find().limit(50).toArray( function(err, hotel){
            res=hotel;
console.log(res.length);
            callback(null, res);
        });
    });
}

exports.userdetails = userdetails;
