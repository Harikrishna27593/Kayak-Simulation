var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
require('./routes/passport')(passport);

var routes = require('./routes/index');
var users = require('./routes/users');
var mongoSessionURL = "mongodb://localhost:27017/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);
var mongoURL = "mongodb://localhost:27017/login";
var kafka = require('./routes/kafka/client');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));
app.use(passport.initialize());

app.use('/', routes);
app.use('/users', users);

app.post('/logout', function(req,res) {
    console.log(req.session.user);
    req.session.destroy();
    console.log('Session Destroyed');
    res.status(200).send();
});


app.post('/login', function(req, res) {
    passport.authenticate('login', function(err, user) {
        if(err) {
            res.status(500).send();
        }
        if(!user) {
            res.status(401).send();
        }
        else{
        req.session.user = user.username;
        console.log(req.session.user);
        console.log("session initilized");
        return res.json({ username:user.username,password:user.password,firstname:user.firstname,lastname:user.lastname,statusCode:"201"});
      }
    })(req, res);
});





app.get('/getUserDetails',function (req,res) {
console.log("IN GET USER DETAILS");
    kafka.make_request('getuserdata','nodata', function(err,results){
        console.log('in result');
       // console.log(results);
        //console.log(results.code);
        if(results.length> 0){
            // console.log(results.arr);
            res.send(results);
        }
    });
});

app.post('/carAvailabilityCheck',function(req, res) {
    var carP=req.body.place;
    var carSmall=carP.substr(1).toLowerCase();
    var carPlace=carP.charAt(0).toUpperCase()+carSmall;
    console.log('---------------------------');
    console.log(carPlace);
    console.log('---------------------------');
    kafka.make_request('carAvailabilityCheck_topic',{"place":carPlace,"pickupdate":req.body.pickupdate,"dropoffdate":req.body.dropoffdate}, function(err,results){
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 204){
                return res.status(204).send();
            }
            else {
                res.status(401).send();
            }
        }
    });
});

//addAdmin
app.post('/addAdmin',function(req, res) {
    kafka.make_request('addAdmin_topic',{"username":req.body.username,"password":req.body.password}, function(err,results){
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 204){
                return res.status(204).send();
            }
            else {
                res.status(401).send();
            }
        }
    });
});



app.get('/carDetails',function(req, res) {
    //console.log(req.param('place'));
    //console.log(req.param('pickup'));

    var carP=req.param('place');
    var carSmall=carP.substr(1).toLowerCase();
    var carPlace=carP.charAt(0).toUpperCase()+carSmall;

    console.log(carPlace);

    kafka.make_request('CarSearch_topic',{"place":carPlace,"pickup":req.param('pickup'),"dropoff":req.param('dropoff')}, function(err,results){
        console.log('in result');
        //console.log(results);
        console.log(results.code);
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 200){
                console.log(results.arr);
                return res.status(200).send(results.arr);
            }
            else {
                res.status(401).send();
            }
        }
    });
});


app.post('/FlightAvailabilityCheck',function(req, res) {

    var flightP=req.body.placefrom;
    var flightSmall=flightP.substr(1).toLowerCase();
    var flightPlace=flightP.charAt(0).toUpperCase()+flightSmall;


    var flightto=req.body.placeto;
    var flighttoSmall=flightto.substr(1).toLowerCase();
    var flightToPlace=flightto.charAt(0).toUpperCase()+flighttoSmall;


    var to=new Date(req.body.arrivaldate);
    var from=new Date(req.body.departdate);
    //var hotelsDateFrom=from.toString().split('T');
    console.log('--------------');
    var fmonth=from.getMonth()+1;
    var tomonth=to.getMonth()+1;
    if(fmonth<10)
    {
        fmonth='0'+fmonth;
    }
    if(tomonth<10)
    {
        tomonth='0'+tomonth;
    }
    var fdate=from.getDate();
    if(from.getDate()<10)
    {
        fdate='0'+fdate;
    }
    var todate=to.getDate();
    if(to.getDate()<10)
    {
        todate='0'+todate;
    }
    var departDate=from.getFullYear()+'-'+fmonth+'-'+fdate;
    var arrivalDate=to.getFullYear()+'-'+tomonth+'-'+todate;

    kafka.make_request('FlightAvailabilityCheck_topic',{"placefrom":flightPlace,"placeto":flightToPlace,"departdate":departDate,"arrivaldate":arrivalDate}, function(err,results){
      console.log('---------------');
       console.log(results);
        console.log('---------------');
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 204){
                return res.status(204).send();
            }
            else {
                res.status(401).send();
            }
        }
    });
});

app.get('/flightDetails',function(req, res) {


    var flightP=req.param('placefrom');
    var flightSmall=flightP.substr(1).toLowerCase();
    var flightPlace=flightP.charAt(0).toUpperCase()+flightSmall;



    var flightto=req.param('placeto');
    var flighttoSmall=flightto.substr(1).toLowerCase();
    var flightToPlace=flightto.charAt(0).toUpperCase()+flighttoSmall;




    var to=new Date(req.param('dateto'));
    var from=new Date(req.param('datefrom'));
    //var hotelsDateFrom=from.toString().split('T');
    console.log('--------------');
    var fmonth=from.getMonth()+1;
    var tomonth=to.getMonth()+1;
    if(fmonth<10)
    {
        fmonth='0'+fmonth;
    }
    if(tomonth<10)
    {
        tomonth='0'+tomonth;
    }
    var fdate=from.getDate();
    if(from.getDate()<10)
    {
        fdate='0'+fdate;
    }
    var todate=to.getDate();
    if(to.getDate()<10)
    {
        todate='0'+todate;
    }
    var departDate=from.getFullYear()+'-'+fmonth+'-'+fdate;
    var arrivalDate=to.getFullYear()+'-'+tomonth+'-'+todate;
    console.log(departDate);
    console.log(arrivalDate);

    kafka.make_request('FlightSearch_topic',{"placefrom":flightPlace,"placeto":flightToPlace,"departdate":departDate,"arrivaldate":arrivalDate}, function(err,results){
        console.log('in result');
        //console.log(results);
        console.log(results.code);
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 200){
                console.log(results.arr)
                return res.status(200).send(results.arr);
            }
            else {
                res.status(401).send();
            }
        }
    });
});


app.post('/AddFlightListing',function(req, res) {

    var flightP=req.body.FLightOrigin;
    var flightSmall=flightP.substr(1).toLowerCase();
    var flightPlace=flightP.charAt(0).toUpperCase()+flightSmall;


    var flightto=req.body.FLightDest;
    var flighttoSmall=flightto.substr(1).toLowerCase();
    var flightToPlace=flightto.charAt(0).toUpperCase()+flighttoSmall;


    var to=new Date(req.body.FilghtArrDate);
    var from=new Date(req.body.FilghtDepDate);
    //var hotelsDateFrom=from.toString().split('T');
    console.log('--------------');
    var fmonth=from.getMonth()+1;
    var tomonth=to.getMonth()+1;
    if(fmonth<10)
    {
        fmonth='0'+fmonth;
    }
    if(tomonth<10)
    {
        tomonth='0'+tomonth;
    }
    var fdate=from.getDate();
    if(from.getDate()<10)
    {
        fdate='0'+fdate;
    }
    var todate=to.getDate();
    if(to.getDate()<10)
    {
        todate='0'+todate;
    }
    var departDate=from.getFullYear()+'-'+fmonth+'-'+fdate;
    var arrivalDate=to.getFullYear()+'-'+tomonth+'-'+todate;
    kafka.make_request('AddFlightListing_topic',{"FlightId":req.body.FlightId,"Operator":req.body. FilghtOperator,"depttime":req.body.FilghtDepTime,"departdate":departDate,"arrivaltime":req.body.FilghtArrTime,"arrivaldate":arrivalDate,"placefrom":flightPlace,"placeto":flightToPlace}, function(err,results){
        console.log('---------------');
        console.log(results);
        console.log('---------------');
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 201){
                return res.status(204).send();
            }
            else {
                res.status(401).send();
            }
        }
    });
});


app.post('/addHotelListing',function (req,res) {
  console.log("IN ADD LISTING TO HOTEL ");

   var hoteldetails=req.body;
  console.log(hoteldetails);
    kafka.make_request('addHotelListing',hoteldetails,function (err,results) {
        //var out=[];
        //var state={};
        //out.push(results);
        console.log('-----------');
        console.log(results.code);
        console.log('-----------');
        if(results.length>0){
            res.status(201).send();
        }
        else if(results.code===401){
            res.status(409).send();
        }
        else
        {
            res.status(401).send();
        }
    })


});


app.get('/getHotelDetails',function(req, res) {

    var from=new Date(req.param('hotelsDateFrom'));
    var to=new Date(req.param('hotelsDateTo'));

     //var hotelsDateFrom=from.toString().split('T');
    console.log('--------------');
    var fmonth=from.getMonth()+1;
    var tomonth=to.getMonth()+1;
if(fmonth<10)
{
    fmonth='0'+fmonth;
}
if(tomonth<10)
{
    tomonth='0'+tomonth;
}
var fdate=from.getDate();
if(from.getDate()<10)
{
    fdate='0'+fdate;
}
    var todate=to.getDate();
    if(to.getDate()<10)
    {
        todate='0'+todate;
    }
    var f=from.getFullYear()+'-'+fmonth+'-'+fdate;
    var t=to.getFullYear()+'-'+tomonth+'-'+todate;

    console.log('--------------');
    //  var hotelsDateTo=to.split('T');
    var hotelP=req.param('hotelPlace');
    var hotelPlace=hotelP.charAt(0).toUpperCase()+hotelP.substr(1);

    console.log(hotelPlace);
    console.log('------------------');
    kafka.make_request('gethoteldetails',{"City":hotelPlace,"hotelsDateTo":t,"hotelsDateFrom":f}, function(err,results){
        console.log('in result');
        console.log(results);
        //console.log(results.code);
            if(results.length> 0){
               // console.log(results.arr);
                res.send(results);
            }
    });
});

app.post('/hotelDetails', function (req,res) {
var hotelsDateFrom=req.body.hotelsDateFrom.split('T');
var hotelsDateTo=req.body.hotelsDateTo.split('T');
//var hotelsDateFrom=new Date(hotelsDateF[0]);
//console.log(hotelsDateFrom[0]);

var hotelP=req.body.hotelPlace;
 var hotelPlace=hotelP.charAt(0).toUpperCase()+hotelP.substr(1);
     console.log(hotelPlace);
 console.log("asdddddddd");
kafka.make_request('postHotelDetails',{"City":hotelPlace,"hotelsDateFrom":hotelsDateFrom[0],"hotelsDateTo":hotelsDateTo[0]},function (err,results) {
    //var out=[];
    //var state={};
    //out.push(results);
    if(results.length>0){
        res.status(201).send();
    }
    else {
        res.status(401).send();
    }
})
});


app.post('/CheckListingIdExists',function(req, res) {
    kafka.make_request('CheckListingIdExists_topic',{"ID":req.body.ID,"Type":req.body.Type}, function(err,results){
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 204){
                return res.status(204).send();
            }
            else {
                res.status(401).send();
            }
        }
    });
});


app.get('/GetListingDetails',function(req, res) {
    kafka.make_request('GetListingDetails_topic',{"Type":req.param('Type'),"ID":req.param('ID')}, function(err,results){
        console.log('in result');
        console.log(results.code);
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 200){
                console.log(results.arr);
                return res.status(200).send(results.arr);
            }
            else {
                res.status(401).send();
            }
        }
    });
});


app.post('/signup', function(req, res) {
  //console.log("signup req: "+req.body.username+req.bodyfirstname);

  kafka.make_request('signuptopic',{  "username":req.body.username,"password":req.body.password,"firstname":req.body.firstname,"lastname":req.body.lastname}, function(err,results){
      console.log('in result - signup strategy - passport.js');
      console.log("results code - in signup strayegy: "+results.code);
      if(err){
          done(err,{});
      }
      else {
        if(results.code === 201){
                  res.status(201).send();
          }
          else if(results.code === 401){
              console.log("passport.js - signup failed - user document not inserted ");
                  res.status(401).send();
          }
          else if(results.code === 500){
              console.log("passport.js - signup failed - user document not inserted ");
                  res.status(500).send();
          }
      }
  });
    // passport.authenticate('signup', function(err, user) {
    //     if(err) {
    //         res.status(500).send();
    //     }
    //
    //     if(!user) {
    //         res.status(401).send();
    //     }
    //     else{
    //
    //     console.log("User data has been created");
    //     return res.status(201).send({username:"test"});
    //   }
    // })(req, res);
});


module.exports = app;