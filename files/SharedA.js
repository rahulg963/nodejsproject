/**
 * Created by rahul on 8/7/16.
 */
var movies = require('./sharedAB');
var emilyMovie = movies();
emilyMovie.favMovie = "Hello World";
console.log("A's favourite movie is : " + emilyMovie.favMovie);
