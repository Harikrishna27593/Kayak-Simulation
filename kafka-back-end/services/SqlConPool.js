var mysql=require('mysql');
var pool  = mysql   .createPool({
    host     : 'localhost',
    user     : 'root',
    password : '1623',
    database : 'KAYAK',
});

function handle_request(query,callback)
{
    pool.getConnection(function (err,connection) {
        connection.query(query,function (err,result) {
            if(!err)
            {
                callback(result,null)
            }
            else
            callback(null,err);
        })

    })
}

exports.handle_request=handle_request;
