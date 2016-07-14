/**
 * Created by rahul on 11/7/16.
 */
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/nodetestdb';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertDocument(db, function() {
        console.log("\n\n DATA INSERTED\n\n");
    });

    console.log("\n\n PROCESSING OF DATA\n\n");


    findRestaurants(db, function() {
        console.log("\n\n DATA RETRIEVED\n\n");
    });

    updateRestaurants(db, function() {
       console.log("\n\n DADATED\n\n");
    });

});


var insertDocument = function(db, callback) {
    db.collection('restaurants').insertOne( {
        "address" : {
            "street" : "2 Avenue",
            "zipcode" : "10075",
            "building" : "1480",
            "coord" : [ -73.9557413, 40.7720266 ]
        },
        "borough" : "Manhattan",
        "cuisine" : "Italian",
        "grades" : [
            {
                "date" : new Date("2014-10-01T00:00:00Z"),
                "grade" : "A",
                "score" : 11
            },
            {
                "date" : new Date("2014-01-16T00:00:00Z"),
                "grade" : "B",
                "score" : 17
            }
        ],
        "name" : "Vella",
        "restaurant_id" : "41704620"
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the restaurants collection.");
        callback();
    });
};
//Query Function
var findRestaurants = function(db, callback) {
    var cursor =db.collection('restaurants').find();
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};
//Query By Field
var findRestaurants2 = function(db, callback) {
    var cursor =db.collection('restaurants').find( { "borough": "Manhattan" } );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

//Query By Field2 of an Array using DOT operator
var findRestaurants3 = function(db, callback) {
    var cursor =db.collection('restaurants').find( { "grades.grade": "B" } );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

//Query by using special operator
var findRestaurants4 = function(db, callback) {
    var cursor =db.collection('restaurants').find( { "grades.score": { $gt: 30 } } );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

//Query by Logical AND
var findRestaurants5 = function(db, callback) {
    var cursor =db.collection('restaurants').find(
        { "cuisine": "Italian", "address.zipcode": "10075" }
    );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

//Query by Logical OR
var findRestaurants6 = function(db, callback) {
    var cursor = db.collection('restaurants').find(
        { $or: [ { "cuisine": "Italian" }, { "address.zipcode": "10075" } ] }
    );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

//Query Based on Sort()
var findRestaurants = function(db, callback) {
    var cursor =db.collection('restaurants').find().sort( { "borough": 1, "address.zipcode": 1 } );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

//Update Only One
var updateRestaurants = function(db, callback) {
    db.collection('restaurants').updateOne(
        { "name" : "Vella" },
        {
            $set: { "cuisine": "American (New)" },
            $currentDate: { "lastModified": true }
        }, function(err, results) {
            console.log(results);
            callback();
        });
};


//Update many
var updateRestaurants2 = function(db, callback) {
    db.collection('restaurants').updateMany(
        { "address.zipcode": "10016", cuisine: "Other" },
        {
            $set: { cuisine: "Category To Be Determined" },
            $currentDate: { "lastModified": true }
        }
        ,
        function(err, results) {
            console.log(results);
            callback();
        });
};

//ReplaceOne replace
var updateRestaurants3 = function(db, callback) {
    db.collection('restaurants').replaceOne(
        { "restaurant_id" : "41704620" },
        {
            "name" : "Vella 2",
            "address" : {
                "coord" : [ -73.9557413, 40.7720266 ],
                "building" : "1480",
                "street" : "2 Avenue",
                "zipcode" : "10075"
            }
        },
        function(err, results) {
            console.log(results);
            callback();
        });
};

//Remove command that removes all
var removeRestaurants = function(db, callback) {
    db.collection('restaurants').deleteMany(
        { "borough": "Manhattan" },
        function(err, results) {
            console.log(results);
            callback();
        }
    );
};


//Remove Only One
var removeRestaurants2 = function(db, callback) {
    db.collection('restaurants').deleteOne(
        { "borough": "Queens" },
        function(err, results) {
            console.log(results);
            callback();
        }
    );
};

//remove all the documents by passing empty condition
var removeRestaurants3 = function(db, callback) {
    db.collection('restaurants').deleteMany( {}, function(err, results) {
        console.log(results);
        callback();
    });
};

//drop a collection
var dropRestaurants = function(db, callback) {
    db.collection('restaurants').drop( function(err, response) {
        console.log(response)
        callback();
    });
};
// ------------------------------------

// // Use connect method to connect to the Server
// MongoClient.connect(url, function (err, db) {
//     if (err) {
//         console.log('Unable to connect to the mongoDB server. Error:', err);
//     } else {
//         //HURRAY!! We are connected. :)
//         console.log('Connection established to', url);
//         //Close Connection
//         db.close();
//     }
// });

// // Get the documents collection
// var collection = db.collection('users');
//
// //Create some users
// var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
// var user2 = {name: 'modulus user', age: 22, roles: ['user']};
// var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};
//
//
// // Insert some users
// collection.insert([user1, user2, user3], function (err, result) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
//     }
// });
//
//
// // Get the documents collection
// collection.update({name: 'modulus user'}, {$set: {enabled: false}}, function (err, numUpdated) {
//     if (err) {
//         console.log(err);
//     } else if (numUpdated) {
//         console.log('Updated Successfully %d document(s).', numUpdated);
//     } else {
//         console.log('No document found with defined "find" criteria!');
//     }
//     //Close connection
// });
//
//
//