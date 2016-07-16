/**
 * Created by rahul on 11/7/16.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/nodetestdb';

var app = express();

//configure app
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

//use middleware
app.use(bodyParser());
//app.use(express.static(path.join(__dirname,'bower_components/bootstrap/dist')));


//define routes

//Connection with database
var insertDocument = function(db, callback) {
    db.collection('userData').insert([
    {
        "userName" : "rahulg", "userPwd" : "1"
    },
        {
            "userName" : "rahulk", "userPwd" : "2"
        },
    ],function(err, result) {
        assert.equal(err, null);
        //console.log("Inserted a document into the userData collection.");
        callback();
    });
};
var insertUser = function(db, callback,userN,userP) {
    db.collection('userData').insert([
        {
            "userName" : userN, "userPwd" : userP
        }
    ],function(err, result) {
        assert.equal(err, null);
        //console.log("Inserted a document into the userData collection.");
        callback();
    });
};

// Insert Default Data
// MongoClient.connect(url, function(err, db) {
//     assert.equal(null, err);
//     insertDocument(db, function() {
//         console.log("DATA INSERTED");
//         //closing of connection
//         db.close();
//     });
// });

app.get('/',function (req, res) {
    //load data from DB here
    //Connection with database
    res.render('index',{
        title : 'My App'
    });
});

app.post('/signup', function(req, res) {
    var userN = req.body.userName;
    var userP = req.body.userPwd;
    console.log("UserName entered : " + userN);
    console.log("UserPassword : "+ userP);
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertUser(db, function() {
        },userN,userP);
        findUser(db, function (error, result, tok) {
            if (result) {
                console.log("Access Granted");
                res.end("Your Token ID is : " + tok);
            }
            else {
                console.log("DENIED");
                res.end("Sorry Can't Login");
            }
        },userN ,userP)
        db.close();
    });

    //Enter details into DB
    //res.redirect('/');
})
app.post('/signup2', function(req, res) {
    var userN = req.param('userName');
    var userP = req.param('userPwd');
    console.log("UserName entered : " + userN);
    console.log("UserPassword : "+ userP);
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertUser(db, function() {
        },userN,userP);
        findUser(db, function (error, result, tok) {
            if (result) {
                console.log("Access Granted");
                res.end("Your Token ID is : " + tok);
            }
            else {
                console.log("DENIED");
                res.end("Sorry Can't Login");
            }
        },userN ,userP)
        db.close();
    });

    //Enter details into DB
    //res.redirect('/');
})

var findUser = function(db, callback, userN, userP) {
    var query = { "userName": userN, "userPwd": userP };
    //console.log(query)
    var cursor = db.collection('userData').find(query).limit(1);
    //console.log(db.collection('userData').find(query));
    //var cnt = 0
    //console.log(cursor.returnKey());
    cursor.each(function(err, doc) {
        //assert.equal(err, null);
       //console.log(doc)
        if (doc != null) {
            //console.dir(doc);
            //ERROR LOGIN MSG
            var tok = doc._id;
            //console.log(tok);
            callback(null,true,tok);
        } else {
            callback(null,false);
        }
    });
};
var findUser2 = function(db, callback, tok) {
    var query = { "_id": ObjectId(tok)};
    //console.log(query)
    var cursor = db.collection('userData').find(query).limit(1);
    //console.log(db.collection('userData').find(query));
    //var cnt = 0
    //console.log(cursor.returnKey());
    cursor.each(function(err, doc) {
        //assert.equal(err, null);
        console.log(doc)
        if (doc != null) {
            //console.dir(doc);
            //ERROR LOGIN MSG
            var tok = doc._id;
            //console.log(tok);
            callback(null,true,tok);
        } else {
            callback(null,false);
        }
    });
};

app.post('/login', function(req, res) {
    var userN = req.body.userName;
    var userP = req.body.userPwd;
    console.log("Login tried by Name : " + userN);
    console.log("Login tried with Password : " + userP);
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findUser(db, function (error, result,tok) {
            if (result) {
                console.log("Access Granted");
                // //res.writeHead(200, {'Content-type': 'text/plain'});
                // //res.write("Access Granted -> Welcome");
                // setTimeout(function () {
                //     res.redirect('/');
                // }, 2000)
                res.end("Access Granted");
            }
            else {
                console.log("DENIED");
                // // res.writeHead(404, {'Content-type': 'text/plain'});
                // // res.write(" Denied -> Bye !!");
                // setTimeout(function () {
                //     res.redirect('/');
                // }, 2000)
            }
        },userN ,userP)
    db.close();
    })

    });

app.post('/login2', function(req, res) {
    // var userN = req.param('userName');
    // var userP = req.param('userPwd');
    var tok = req.param('token');
    // console.log("Login tried by Name : " + userN);
    // console.log("Login tried with Password : " + userP);
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findUser2(db, function (error, result) {
            if (result) {
                console.log("Access Granted");
                res.end("Access Granted");
            }
            else {
                console.log("DENIED");
                // // res.writeHead(404, {'Content-type': 'text/plain'});
                // // res.write(" Denied -> Bye !!");
                // setTimeout(function () {
                //     res.redirect('/');
                // }, 2000)
            }
        },tok)
        db.close();
    })

});



app.listen(1331, function () {
    console.log(
        'ready on port 1331');
});