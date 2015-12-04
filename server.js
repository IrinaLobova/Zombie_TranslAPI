var http = require('http');
var fs = require('fs');
var url = require('url');

var logger = require('./logger');
var zomTrans = require('./zombifyTransformer');
var unzomTrans = require('./unzombifyTransformer');

var markdownTrans = require('./markdownTransformer');

var handleRequest = function(request, response){

    var purl = url.parse(request.url, true);

    if(request.url === '/favicon.ico'){
        response.writeHead(200);
        response.end();
        return;
    } else if(purl.pathname === '/zombify'){
        response.writeHead(200, {'Content-Type': 'application/json'});
        var str = purl.query.string;
        str = 'hello';

        str.pipe(zomTrans())
           .pipe(response);

        str.on("finished", function(){
            response.end();
        });

    } else if(purl.pathname === '/unzombify'){
        response.writeHead(200, {'Content-Type': 'application/json'});
        var query = purl.query.string;


        query.pipe(unzomTrans())
             .pipe(response);

        query.on("finished", function(){
            response.end();
        });


    } else if(request.url === '/'){
        response.writeHead(200, {'Content-Type': 'text/html'});
        var file = fs.createReadStream('sample.md');

        file.pipe(markdownTrans()).pipe(response);

        file.on("finished", function(){
            response.end();
        });

    } else {
        response.writeHead(404);
        response.end("404 Not Found");
    }


    logger(request, response);

}

var server = http.createServer(handleRequest);

server.listen(7000, function(){
    console.log("Listening on port 7000");
});
