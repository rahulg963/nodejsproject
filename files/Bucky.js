/**
 * Created by rahul on 7/7/16.
 */
var Bucky = {
    favFood : "bacon",
    favMovie : "Chappie"
};

//Person is reference to Bucky

var Person = Bucky;
Person.favFood = "salad";
console.log(Bucky.favFood);