var MongoConPool=require("./MongoConPool");

function handle_request(msg, callback){
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
