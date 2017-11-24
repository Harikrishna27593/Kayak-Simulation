var MongoConPool=require("./MongoConPool");
function userdetails(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
        var queryJson={$or:[{Email:msg.username},{FirstName:msg.firstname},{LastName:msg.lastname}]};
        MongoConPool.find('Users',queryJson,function(err, hotel){
            res=hotel;
          console.log(res.length);
            callback(null, res);
        });
}

exports.userdetails = userdetails;
