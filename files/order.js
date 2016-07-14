/**
 * Created by rahul on 7/7/16.
 */
function placeAnOrder(orderNumber){
    console.log("Customer order: ", orderNumber);
    cookAndDeliverFood(function () {
        console.log("Deliver food order : " ,orderNumber);

    })
}

/*
function placeAnOrder(orderNumber){
    console.log("Customer order: ", orderNumber);
    cookAndDeliverFood(test)
}

function test () {
    console.log("Deliver food order : " ,orderNumber);
}
*/
//simulate a 5 second operation
function cookAndDeliverFood(callback) {
    setTimeout(callback,5000);
}

placeAnOrder(1);
placeAnOrder(2);
placeAnOrder(3);
placeAnOrder(4);
