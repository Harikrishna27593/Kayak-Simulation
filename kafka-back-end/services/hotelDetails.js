var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
function hotel_details(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        console.log("ASSSSSSSSSSS");
        console.log(msg.hotelsDateFrom);
        var from=msg.hotelsDateFrom;
        var to=msg.hotelsDateTo;
        var coll = mongo.collection('HotelListings');
        coll.find({City: msg.City, hotelsDateFrom: {$gte:from},hotelsDateTo: {$lt:to}}).toArray( function(err, hotel){
res=hotel;
//console.log(res.length);
callback(null, res);
        });
    });
}
function gethoteldetails(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        console.log("ASSSSSSSSSSS");
        console.log(msg.hotelsDateFrom);
        var from=msg.hotelsDateFrom;
        var to=msg.hotelsDateTo;
        var coll = mongo.collection('HotelListings');
        coll.find({City: msg.City, hotelsDateFrom: {$gte:from},hotelsDateTo: {$lt:to}}).toArray( function(err, hotel){
            res=hotel;
//console.log(res.length);
            callback(null, res);
        });
    });
}




exports.hotel_details = hotel_details;
exports.gethoteldetails = gethoteldetails;