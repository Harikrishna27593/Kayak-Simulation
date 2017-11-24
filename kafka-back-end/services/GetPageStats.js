var winston = require('winston');
function handle_request(msg, callback) {
    winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    winston.remove(winston.transports.Console);

    var cars_page_count = 0, hotels_page_count = 0,flights_page_count=0;
    var oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 200);
    var res={}
    //find data for last 10 days
    var options = {
        from: oldDate,
        until: new Date,
        limit: 100,
        start: 0,
        order: 'desc',
        fields: ['page_name']
    };
    winston.query(options, function (err, results) {
        if (err) {
            throw err;
        }

        //winston.info("yo yo");
        console.log("results "+results);

        for(var i = 0 ; i < results.file.length ; i++) {
            console.log(results.file[i].page_name);
            if (results.file[i].page_name == "Cars_page") {
                cars_page_count++;
            }

            if (results.file[i].page_name == "Hotels_page") {
                hotels_page_count++;
            }

            if (results.file[i].page_name == "Flights_page") {
                flights_page_count++;
            }
        }

         var resArr = [];

         resArr.push([{"label" : "cars_page" , "value" : cars_page_count}, {"label" : "hotels_page" , "value" : hotels_page_count},{"label" : "flights_page" , "value" : flights_page_count}]);

        console.log(resArr);
        res.code = "200";
        res.value = "Stats Successful";
        res.arr=resArr;
        callback(null, res);
    });

    winston.remove(winston.transports.File);
    winston.add(winston.transports.Console);
}

exports.handle_request = handle_request;