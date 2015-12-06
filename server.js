var http = require('http');
var fs = require('fs');
var url = require('url');
var stream = require('stream');

var logger = require('./logger');
var zomTrans = require('./zombifyTransformer');
var unzomTrans = require('./unzombifyTransformer');
var jsonTrans = require('./jsonify');

var markdownTrans = require('./markdownTransformer');

var handleRequest = function(request, response){

    var purl = url.parse(request.url, true);


    if(purl.query.q !== undefined && purl.query.q.length > 1000) {
        response.writeHead(414);
        response.end(JSON.stringify({'status': 414, 'message' : 'input is over 1000 characters long'}));

    }
    else if(purl.pathname === '/zombify'){
        response.writeHead(200, {'Content-Type': 'application/json'});
        var s = new stream.Readable();
        s.push(purl.query.q);
        s.push(null);

        s.pipe(zomTrans())
         .pipe(jsonTrans())
         .pipe(response);

        s.on("finished", function(){
            response.end();
        });

    } else if(purl.pathname === '/unzombify'){
        response.writeHead(200, {'Content-Type': 'application/json'});
        var s = new stream.Readable();
        s.push(purl.query.q);
        s.push(null);

        s.pipe(unzomTrans())
         .pipe(jsonTrans())
         .pipe(response);

        s.on("finished", function(){
            response.end();
        });

    } else if(request.url === '/'){
        response.writeHead(200, {'Content-Type': 'text/html'});
        var file = fs.createReadStream('readme.md');

        file.pipe(markdownTrans()).pipe(response);

        file.on("finished", function(){
            response.end();
        });

    } else {
        response.writeHead(404);
        response.end(JSON.stringify({'status': 404, 'message' : 'route not found'}));
    }


    logger(request, response);

}

var server = http.createServer(handleRequest);

server.listen(7000, function(){
    console.log("Listening on port 7000");
});
