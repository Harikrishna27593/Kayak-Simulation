var connection =  new require('./kafka/Connection');
var winston = require('winston');
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
var AdminUserUpdate = require('./services/AdminUserUpdate');
var AdminUserCheck = require('./services/AdminUserCheck');
var AdminUserDelete=require('./services/AdminUserDelete');
var UpdateCarListing = require('./services/UpdateCarListing');
var UpdateFlightListing= require('./services/UpdateFlightListing');
var UpdateHotelListing= require('./services/UpdateHotelListing');
var DeleteUser= require('./services/DeleteUser');
var BookingCountGraph = require('./services/BookingCountGraph');
var RevenueGraph = require('./services/RevenueGraph');

var bcrypt = require('bcryptjs');

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

var topic_name_15='makePayment_topic';
var consumer15=connection.getConsumer(topic_name_15);

var topic_name_16='GetPageStats_topic';
var consumer16=connection.getConsumer(topic_name_16);

var topic_name_17='AdminUserUpdate_topic';
var consumer17=connection.getConsumer(topic_name_17);

var topic_name_18 = 'AdminUserCheck_topic';
var consumer18 = connection.getConsumer(topic_name_18);

var topic_name_19 = 'AdminUserDelete_topic';
var consumer19 = connection.getConsumer(topic_name_19);

var topic_name_20 = 'UpdateCarListing_topic';
var consumer20 = connection.getConsumer(topic_name_20);

var topic_name_21 = 'UpdateFlightListing_topic';
var consumer21 = connection.getConsumer(topic_name_21);

var topic_name_22 = 'UpdateHotelListing_topic';
var consumer22 = connection.getConsumer(topic_name_22);

var topic_name_23 = 'DeleteUser_topic';
var consumer23 = connection.getConsumer(topic_name_23);

var topic_name_24='getUserPayments';
var consumer24=connection.getConsumer(topic_name_24);

var topic_name_25='getFuturePayments';
var consumer25=connection.getConsumer(topic_name_25);

var topic_name_26='AdminSearchPayments_topic';
var consumer26=connection.getConsumer(topic_name_26);

var topic_name_27='BookingCountGraph_topic';
var consumer27=connection.getConsumer(topic_name_27);

var topic_name_28='RevenueGraph_topic';
var consumer28=connection.getConsumer(topic_name_28);


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




consumer1.on('message', function (message) {
    console.log('message received consumer 1 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
//console.log(data.data.username);
    var query="select username,password,isAdmin from KayakUsers where username='"+data.data.username+"'";
    SqlConPool.handle_request(query,function (result,error) {
        var res={};
        console.log("first");
        if(result.length===1)
        {
            console.log("------------");
            console.log(result);
            JsonString=JSON.stringify(result);
            JSONParse=JSON.parse(JsonString);
            console.log(JSONParse[0].password);
            bcrypt.compare(data.data.password,JSONParse[0].password,function (err,output) {
                if(output===true)
                {
                    res.code="200";
                    res.username = JSONParse[0].username;
                    res.isAdmin=JSONParse[0].isAdmin;
                    console.log('after handle in server.js '+ res.code);
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
                }
                else
                {
                    res.code="400";
                    console.log('after handle in server.js '+ res.code);
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
                }
            });
        }
        else
        {
            res.code="400";
            console.log('after handle in server.js '+ res.code);
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
        }

    });
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    winston.log('info', 'Login Page Viewed', { page_name : 'Login_page'});

    winston.remove(winston.transports.File);
    winston.add(winston.transports.Console);
});

consumer2.on('message', function (message) {
    console.log('message received in consumer2 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    let saltRounds=10;
//should use hashsync
    //newpass will be my newencrypted password
    let newpass=bcrypt.hashSync(data.data.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
    });

    var query="select username from KayakUsers where username='"+data.data.username+"'";
    SqlConPool.handle_request(query,function (result,error) {
        var res={};
        console.log(result.length);
        if(result.length!==0)
        {
            res.code="400";
            console.log('after handle in server.js '+ res.code);
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
                //console.log(data);
            });
        }
        else
        {
            console.log("INSIDE ELSE");
            query1="insert into KayakUsers values ('"+data.data.username+"','','','','','',0,'','"+newpass+"','No')";
            SqlConPool.handle_request(query1,function (result1,error) {
                console.log(result1);
                if(error)
                {

                }
                else
                {
                    console.log("asdasd");
                    res.code="200";
                    console.log('after handle in server.js '+ res.code);
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
                        //console.log(data);
                    });
                }
            });
        }

    });
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    winston.log('info', 'Signup Page Viewed', { page_name : 'Signup_page'});

    winston.remove(winston.transports.File);
    winston.add(winston.transports.Console);
});




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
        producer.send(payloads, function(err, data){
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
        producer.send(payloads, function(err, data){
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
    userDetails.handle_request(data.data, function(err,res){
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
    console.log('message received in consumer14 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log("-----------------------");
    console.log(data.data);
    console.log("-----------------------");
    var res = {};
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    }
    today = yyyy+'-'+mm + '-' + dd ;

    var paymentquery="";
    var bookingquery="";
    //---------------FOR CARS--------------//

    if(data.data.category=="car") {

        console.log(data.data.carsDatePickUp.substr(0, 10));

        var datepickup=new Date(data.data.carsDatePickUp.substr(0, 10));
        var datedropoff=new Date(data.data.carsDateDropOff.substr(0, 10));
        var timeDiff = Math.abs(datedropoff.getTime() - datepickup.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        console.log(diffDays);

        var carsPickUP = data.data.carsDatePickUp.substr(0, 10) + ' ' + data.data.carsTimePickUp.substring(11, 19);
        var carsDropOff = data.data.carsDateDropOff.substr(0, 10) + ' ' + data.data.carsTimeDropOff.substring(11, 19);
        var totalPrice=diffDays*data.data.price;
        //res.paymentDate=today;
        paymentquery = "insert into PaymentDetails(itemId,category,username,amount,paymentDate,cardDetails) values('" + data.data.id + "','" + data.data.category + "','" + data.data.username + "','" + totalPrice + "','" + today + "',864589465)";

    }
    else if(data.data.category=="flight")
    {


        paymentquery = "insert into PaymentDetails(itemId,category,username,amount,paymentDate,cardDetails) values('" + data.data.id + "','" + data.data.category + "','" + data.data.username + "','" + data.data.price + "','" + today + "',864589465)";

    }

    SqlConPool.handle_request(paymentquery, function (result, error) {
        console.log(result.insertId);
        if(data.data.category=="car")
        {
            bookingquery="insert into carBooking(PaymentId,CarPickUp,carDropOff,carPlace) values('"+result.insertId+"','"+carsPickUP+"','"+carsDropOff+"','"+data.data.carPickupPlace+"')";
        }

        else if(data.data.category=="flight")
        {
            var flightsDateFrom=data.data.flightsDateFrom.split('T');
            bookingquery="insert into flightBooking(PaymentId,departure,arrival,origin,destination,passengerCount,type,journey,flightsDateFrom,operator) values('"+result.insertId+"','"+data.data.departureTime+"','"+data.data.arrivalTime+"','"+data.data.origin+"', '"+data.data.destination+"', '"+data.data.count+"', '"+data.data.type+"', '"+data.data.journey+"','"+flightsDateFrom[0]+"','"+data.data.operator+"')";
            console.log(bookingquery);
        }

        SqlConPool.handle_request(bookingquery,function (result1,err) {
            console.log(result1);
            res.code=200;
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    });
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    winston.log('info', 'Payment Page Viewed', { page_name : 'Payment_page'});

    winston.remove(winston.transports.File);
    winston.add(winston.transports.Console);
});


consumer16.on('message', function (message) {
    console.log('message received in consumer16 - server.js');
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
            //console.log(data);
        });
        return;
    });
});


consumer17.on('message', function (message) {
    console.log('message received in consumer17 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    AdminUserUpdate.handle_request(data.data, function(err,res){
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


consumer18.on('message', function (message) {
    console.log('message received in consumer18 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    AdminUserCheck.handle_request(data.data, function(err,res){
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

consumer19.on('message', function (message) {
    console.log('message received in consumer19 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    AdminUserDelete.handle_request(data.data, function(err,res){
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

consumer20.on('message', function (message) {
    console.log('message received in consumer20 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    UpdateCarListing.handle_request(data.data, function(err,res){
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

consumer21.on('message', function (message) {
    console.log('message received in consumer21 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    UpdateFlightListing.handle_request(data.data, function(err,res){
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

consumer22.on('message', function (message) {
    console.log('message received in consumer22 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    UpdateHotelListing.handle_request(data.data, function(err,res){
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

consumer23.on('message', function (message) {
    console.log('message received in consumer23 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    DeleteUser.handle_request(data.data, function(err,res){
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

consumer24.on('message', function (message) {
    console.log('message received in consumer 24- server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    }
    today = yyyy+'-'+mm + '-' + dd ;
//console.log(today);
    //var getDetails="select * from paymentdetails P,carBooking C,flightBooking F where P.PaymentId=C.PaymentId or P.PaymentId=F.paymentId and paymentDate < '"+today+"' and username='"+data.data.username+"'";
    var output=[];
    var getDetails="select * from paymentdetails P,carBooking C where P.PaymentId=C.PaymentId and P.paymentDate < '2017-11-27' and P.username='"+data.data.username+"'";
    SqlConPool.handle_request(getDetails,function (result1,err) {

        for(var i=0;i<result1.length;i++)
        {
            output.push(result1[i]);
        }
        var getFlightDetails="select * from paymentdetails P,flightBooking C where P.PaymentId=C.PaymentId and P.paymentDate < '"+today+"' and P.username='"+data.data.username+"'";
        SqlConPool.handle_request(getFlightDetails,function (result2,err) {
            for(var i=0;i<result2.length;i++)
            {
                output.push(result2[i]);
            }
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: output
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                // console.log(data);
            });
            return;
        });
    });
});


consumer25.on('message', function (message) {
    console.log('message received in consumer 25 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
//console.log(today);
    //var getDetails="select * from paymentdetails P,carBooking C,flightBooking F where P.PaymentId=C.PaymentId or P.PaymentId=F.paymentId and paymentDate < '"+today+"' and username='"+data.data.username+"'";
    var output = [];
    var getDetails = "select * from paymentdetails P,carBooking C where P.PaymentId=C.PaymentId and C.carPickUp > '" + today + "' and P.username='" + data.data.username + "'";
    SqlConPool.handle_request(getDetails, function (result1, err) {

        for (var i = 0; i < result1.length; i++) {

            output.push(result1[i]);
        }
        var getFlightDetails = "select * from paymentdetails P,flightBooking C where P.PaymentId=C.PaymentId and C.flightsDateFrom > '" + today + "' and P.username='" + data.data.username + "'";
        SqlConPool.handle_request(getFlightDetails, function (result2, err) {
            for (var i = 0; i < result2.length; i++) {

                output.push(result2[i]);
            }
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: output
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                // console.log(data);
            });
            return;
        });
    });
});



consumer26.on('message',function (message) {
    console.log('message received in consumer 26- server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log('-------------');
    //console.log(Object.keys(data.data.input).length);
    var d='';
    if(Object.keys(data.data.input).length==2)
    {
        var month = data.data.input.month;
        //var day = data.data.input.day;
        if (month < 10)
            month1 = '0' + month;
        else
            month1 = month;

        d = 2017 + '-' + month1 + '%';
    }
    else
        d=data.data.input.date;

    var getPaymentDetails="select * from paymentdetails where paymentDate like '"+d+"'";
    SqlConPool.handle_request(getPaymentDetails,function (result2,err) {
        var payloads = [
            {
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId: data.correlationId,
                    data: result2
                }),
                partition: 0
            }
        ];
        producer.send(payloads, function (err, data) {
            // console.log(data);
        });
        return;
    });
    //console.log(d);
    console.log('-------------');
});


    consumer27.on('message', function (message) {
        console.log('message received in consumer27 - server.js');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        BookingCountGraph.handle_request(data.data, function(err,res){
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

consumer28.on('message', function (message) {
    console.log('message received in consumer28 - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    RevenueGraph.handle_request(data.data, function(err,res){
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

