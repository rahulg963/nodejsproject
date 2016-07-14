/**
 * Created by rahul on 8/7/16.
 */
var Rahul = {
    printFirstName : function(){
    console.log("My name is Rahul Goel");
    console.log(this === Rahul);
}
}
Rahul.printFirstName();

// default context is global
function doSomething(){
    console.log("\n I am Worthy");
    console.log( this === global );
}
doSomething();
