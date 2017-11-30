var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
var winston = require('winston');
function hotel_details(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var from=msg.hotelsDateFrom;
        var to=msg.hotelsDateTo;
        var coll = mongo.collection('HotelListings');
        console.log(from);
        console.log(to);
        coll.find({City: msg.City, hotelsDateFrom: {$lt:from},hotelsDateTo: {$gte:to}}).toArray( function(err, hotel)
        {
            res=hotel;
            callback(null, res);
        });
    });
}
function gethoteldetails(msg, callback){

    winston.remove(winston.transports.Console);
    winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    winston.log('info', 'Hotel Page Viewed', { page_name : 'Hotels_page'});

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
    winston.remove(winston.transports.File);
    winston.add(winston.transports.Console);
}




exports.hotel_details = hotel_details;
exports.gethoteldetails = gethoteldetails;
