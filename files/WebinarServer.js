/**
 * Created by rahul on 10/7/16.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

//configure app

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

//use middleware

app.use(bodyParser());
//app.use(express.static(path.join(__dirname,'bower_components/bootstrap/dist')));

//define routes

var todoItems = [
    {id : 1, desc : 'foo'},
    {id : 2, desc : 'bar'},
    {id : 3, desc : 'baz'}
];

app.get('/',function (req, res) {
    //load data from DB here
    res.render('index',{
        title : 'My App',
        items : todoItems
    });
    //res.send('hello, express !');
});

app.post('/add', function (req, res) {
    var newItem = req.body.newItem;
    todoItems.push({
        id : todoItems.length + 1,
        desc : newItem
    });
    res.redirect('/');
})

// app.get('/api/user/:id',function (req,res) {
//    var userId = req.params.id;
//
//     //load user and JSON
// });
    

app.listen(1337, function () {
     console.log('ready on port 1337');
});

