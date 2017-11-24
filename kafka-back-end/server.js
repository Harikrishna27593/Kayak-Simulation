var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var signup = require('./services/signup');
var hoteldetails=require('./services/hotelDetails');
var userDetails=require('./services/userDetails');
var addhotellisting=require('./services/addhotellisting');
var CarAvailabilityCheck = require('./services/CarAvailabilityCheck');
var CarSearch = require('./services/CarSearch');
var FlightAvailabilityCheck = require('./services/FlightAvailabilityCheck');
var FlightSearch = require('./services/FlightSearch');
var AddFlightListing = require('./services/AddFlightListing');
var CheckListingIdExists=require('./services/CheckListingIdExists');
var GetListingDetails=require('./services/GetListingDetails');
var SqlConPool=require('./services/SqlConPool');
var AddCarListing = require('./services/AddCarListing');
var GetPageStats = require('./services/GetPageStats');

//var bcrypt = require('bcrypt');

var topic_name_1 = 'login_topic';
var consumer1 = connection.getConsumer(topic_name_1);

var topic_name_2 = 'signuptopic';
var consumer2 = connection.getConsumer(topic_name_2);

var topic_name_3='postHotelDetails';
var consumer3=connection.getConsumer(topic_name_3);

var topic_name_4='gethoteldetails';
var consumer4=connection.getConsumer(topic_name_4);

var topic_name_5 = 'carAvailabilityCheck_topic';
var consumer5 = connection.getConsumer(topic_name_5);

var topic_name_6 = 'CarSearch_topic';
var consumer6 = connection.getConsumer(topic_name_6);

var topic_name_7 = 'FlightAvailabilityCheck_topic';
var consumer7 = connection.getConsumer(topic_name_7);

var topic_name_8 = 'FlightSearch_topic';
var consumer8 = connection.getConsumer(topic_name_8);

var topic_name_9='getuserdata';
var consumer9=connection.getConsumer(topic_name_9);

var topic_name_10='addHotelListing';
var consumer10=connection.getConsumer(topic_name_10);

var topic_name_11='AddFlightListing_topic';
var consumer11=connection.getConsumer(topic_name_11);

var topic_name_12='CheckListingIdExists_topic';
var consumer12=connection.getConsumer(topic_name_12);

var topic_name_13='GetListingDetails_topic';
var consumer13=connection.getConsumer(topic_name_13);

var topic_name_14='AddCarListing_topic';
var consumer14=connection.getConsumer(topic_name_14);

var topic_name_15='GetPageStats_topic';
var consumer15=connection.getConsumer(topic_name_15);


var producer = connection.getProducer();
console.log('server is running');

// consumer1.on('message', function (message) {
//     console.log('message received consumer 1 - server.js');
//     console.log(JSON.stringify(message.value));
//     var data = JSON.parse(message.value);
// //console.log(data.data.username);
// var query="select username,password from KayakUsers where username='"+data.data.username+"'";
// SqlConPool.handle_request(query,function (result,error) {
// var res={};
//         if(result.length===1)
//   {
//       console.log(result);
//       JsonString=JSON.stringify(result);
//       JSONParse=JSON.parse(JsonString);
//       console.log(JSONParse[0].username);
//       bcrypt.compare(data.data.password,JSONParse[0].password,function (err,output) {
//          if(output===true)
//          {
//              res.code="200";
//              res.username = JSONParse[0].username;
//          }
//          else
//          {
//              res.code="400";
//          }
//       });
//   }
//   else
// {
//    res.code="400";
// }
//     console.log('after handle in server.js '+ res.code);
//     var payloads = [
//         { topic: data.replyTo,
//             messages:JSON.stringify({
//                 correlationId:data.correlationId,
//                 data : res
//             }),
//             partition : 0
//         }
//     ];
//     producer.send(payloads, function(err, data){
//         console.log(data);
//        });
//     });
// });
//
// consumer2.on('message', function (message) {
//     console.log('message received in consumer2 - server.js');
//     console.log(JSON.stringify(message.value));
//     var data = JSON.parse(message.value);
//     let saltRounds=10;
// //should use hashsync
//     //newpass will be my newencrypted password
//     let newpass=bcrypt.hashSync(data.data.password, saltRounds, function(err, hash) {
//         // Store hash in your password DB.
//     });
//
//     var query="select username from KayakUsers where username='"+data.data.username+"'";
//     SqlConPool.handle_request(query,function (result,error) {
//         var res={};
//         if(result.length>0)
//         {
//            res.code="400";
//         }
//         else
//         {
//             query="insert into KayakUsers (username,password) values('"+data.data.username+"','"+newpass+"')";
//             res.code="200";
//         }
//         console.log('after handle in server.js '+ res.code);
//         var payloads = [
//             { topic: data.replyTo,
//                 messages:JSON.stringify({
//                     correlationId:data.correlationId,
//                     data : res
//                 }),
//                 partition : 0
//             }
//         ];
//         producer.send(payloads, function(err, data){
//             console.log(data);
//         });
//     });
//
//
//
//
//
//
//
// });


consumer3.on('message', function (message) {
    console.log('message received in consumer3 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    hoteldetails.hotel_details(data.data, function(err,res){
        console.log('after handle in server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer2.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});


consumer4.on('message', function (message) {
    console.log('message received in consumer4 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    hoteldetails.gethoteldetails(data.data, function(err,res){
        console.log('after handle in server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer2.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer5.on('message', function (message) {
    console.log('message received in consumer5 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    CarAvailabilityCheck.handle_request(data.data, function(err,res){
        console.log('after handle in server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer6.on('message', function (message) {
    console.log('message received in consumer6 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    CarSearch.handle_request(data.data, function(err,res){
        console.log('after handle in server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});


consumer7.on('message', function (message) {
    console.log('message received in consumer7 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    FlightAvailabilityCheck.handle_request(data.data, function(err,res){
        console.log('after handle in server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});


consumer8.on('message', function (message) {
    console.log('message received in consumer8 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    FlightSearch.handle_request(data.data, function(err,res){
        console.log('after handle in server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer9.on('message', function (message) {
    console.log('message received CONSUMER 9');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    userDetails.userdetails(data.data, function(err,res){
        console.log('after handle in server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});


consumer10.on('message', function (message) {
    console.log('message received CONSUMER 10');
    //console.log(message);
    /// console.log(JSON.stringify(message.value));
    // console.log(t);

    var data = JSON.parse(message.value);

    addhotellisting.addhotel(data.data, function(err,res){
        console.log('after handle in server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});


consumer11.on('message', function (message) {
    console.log('message received in consumer11 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    AddFlightListing.handle_request(data.data, function(err,res){
        console.log('after handle in server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer12.on('message', function (message) {
    console.log('message received in consumer12 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    CheckListingIdExists.handle_request(data.data, function(err,res){
        console.log('after handle in server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer13.on('message', function (message) {
    console.log('message received in consumer13 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    GetListingDetails.handle_request(data.data, function(err,res){
        console.log('after handle in server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});


consumer14.on('message', function (message) {
    console.log('message received in consumer14 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    AddCarListing.handle_request(data.data, function(err,res){
        console.log('after handle in server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer15.on('message', function (message) {
    console.log('message received in consumer15 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    GetPageStats.handle_request(data.data, function(err,res){
        console.log('after handle in server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});
























