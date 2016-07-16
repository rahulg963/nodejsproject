/**
 * Created by rahul on 9/7/16.
 */

//postman request :-
//http://localhost:8000/api/users?user=rahul&&pwd=1234

var http = require("http");
var express = require('express')
var app = express();
app.listen(8000);
console.log("Server Started at localhost:" + 8000);
var name = "rahul" ;
var pwd = 1234;
app.get('/api/users', function(req, res)
{
    var user_name = req.param('user');
    var user_pwd = req.param('pwd');
    console.log("User Name is : " + user_name);
    console.log("User Password is : " + user_pwd);

    if(user_name == name && user_pwd == pwd){
        res.writeHead(200,{'Content-type' : 'text/plain'});
        res.end("\nTHANK YOU!!!");
    }
    else{
        res.writeHead(404,{'Content-type' : 'text/plain'});
        res.end("nothing special");
    }
});