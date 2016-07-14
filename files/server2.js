/**
 * Created by rahul on 9/7/16.
 */
var connect =  require('connect');
var http = require('http');

var app = connect();


function doFirst(request, response, next){
    console.log("Bacon");
    //It will move to next value in the stack.
    next();
}

function doSecond(request, response, next) {
    console.log("Tuna");
    next();
}

function forum(request, response) {
    console.log('User Requested forum')
}

function profile(request, response) {
    console.log('User Requested profile')
}
//here stack is created and next is use to move to next thing
// app.use(doFirst);
// app.use(doSecond);

app.use('/forum', forum);
app.use('/profile', profile);

http.createServer(app).listen(1234);
console.log("Server is running...");