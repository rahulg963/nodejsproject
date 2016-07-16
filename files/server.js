/**
 * Created by rahul on 9/7/16.
 */
var http = require('http');
var fs = require('fs');
//404 response
function send404Response(response){
    response.writeHead(404, {"Content-Type" : "text/plain"});
    response.write("Error 404 : Page not Found!");
    response.end();
}

function  onRequest(request, response) {
        if(request.method == 'GET' && request.url == '/'){
            response.writeHead(200, {"Content-Type" : "text/html"});
            fs.createReadStream("   html/index.html").pipe(response);
        }else {
            send404Response(response);
        }
}
//
// function onRequest(request, response) {
//     console.log("A user made a request" + request.url);
//     response.writeHead(210,{"Context-Type" : "text/plain"});
//     response.write("Here is your response Data");
//     response.end();
// }

http.createServer(onRequest).listen(8888);
console.log("Server is now running.....");



// var http = require("http");
//
// http.createServer(function(req,res){
//     setTimeout(function(){
//         res.end("hello")
//     },5000)
// }).listen(3000)