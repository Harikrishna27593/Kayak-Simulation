
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('login');
            console.log("req - passport: "+msg.username);
            coll.findOne({username: msg.username, password: msg.password}, function(err, user){
                if (user) {
                  console.log("user found");
                  res.code = "200";
                  res.value = "Success Login";
                  res.username = user.username;
                  res.password = user.password;
                  res.firstname = user.firstname;
                  res.lastname = user.lastname;
                } else {
                  res.code = "401";
                  res.value = "Failed Login";
                }
                callback(null, res);
            });
        });
}

exports.handle_request = handle_request;
