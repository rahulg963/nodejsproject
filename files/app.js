/**
 * Created by rahul on 7/7/16.
 */

var http = require("http");

http.createServer(function(request,response){
    response.writeHead(209,{'Content-type' : 'text/plain'});
    response.end('Hello\n');
}).listen(3000);

console.log('Server running on http://127.0.0.1:8081/');
s