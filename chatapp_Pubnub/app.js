var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/nodetestdb';

var app = express();
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser());


var pubnub = require("pubnub")({
    //ssl           : true,  // <- enable TLS Tunneling over TCP
    publish_key   : "pub-c-0bea5456-4cd7-4c93-a213-456362636869",
    subscribe_key : "sub-c-ae6c9cba-44d9-11e6-ba28-02ee2ddab7fe"
});

var message = { "Hello" : "World!" };

pubnub.publish({
    channel   : 'hello_world',
    message   : message,
    callback  : function(e) {
        console.log( "SUCCESS!", e );
    },
    error     : function(e) {
        console.log( "FAILED! RETRY PUBLISH!", e );
    }
});

pubnub.subscribe({
    channel  : "hello_world",
    message : function(message) {
        console.log( " > ", message );
    }
});

app.listen(1331, function () {
    console.log(
            'ready on port 1331');
});
