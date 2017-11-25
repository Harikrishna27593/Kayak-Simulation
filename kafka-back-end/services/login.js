var MongoConPool=require("./MongoConPool");
var winston = require('winston');
function handle_request(msg, callback){

    winston.remove(winston.transports.File);
    winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    winston.log('info', 'Login Page Viewed', { page_name : 'Login_page'});

    var res = {};

    var queryJson={username: msg.username, password: msg.password};
        MongoConPool.find('login',queryJson,function(err, user){
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

}

exports.handle_request = handle_request;
