var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
function addhotel(msg, callback){

    var res = {};
        console.log("In handle request:"+ JSON.stringify(msg));
        mongo.connect(mongoURL, function(){
        var coll = mongo.collection('HotelListings');
        var hotelId=Math.floor(Math.random() * 900);
        coll.find({Name:msg.Name,Address:msg.Address,City:msg.City,State:msg.State}).toArray(function (err,result) {
            console.log('----------------------------');
            console.log(result.length);
            console.log('----------------------------');
        if(result.length===0)
        {
            coll.insertOne({hotelId:hotelId,Name:msg.Name,Address:msg.Address,City:msg.City,State:msg.State,Rooms:{singleRoomPrice:msg.Rooms.singleRoomPrice,doubleRoomPrice:msg.Rooms.doubleRoomPrice,suitRoomPrice:msg.Rooms.suitRoomPrice},Availability:msg.Availability,hotelsDateFrom:msg.hotelsDateFrom,hotelsDateTo:msg.hotelsDateTo,Ratings:'',Reviews:''},function(err, hotel){
                if (hotel.insertedCount>0) {
                    console.log("inserted into HotelListings");
                    //res.redirect(201,'/login');
                    res.code = "201";
                    res.value = "Success Inserted into hotelLisitng";
                } else {
                    //res.status(400);
                    console.log("document not inserted");
                    res.code = "400";
                    res.value = "failure insertion";
                }
            });
        }
            else
        {
            console.log("document not inserted");
            res.code = "401";
            res.value = "Duplicate record";
        }
        });
        callback(null, res);
    });
}

exports.addhotel = addhotel;
