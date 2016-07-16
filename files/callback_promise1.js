/**
 * Created by rahul on 16/7/16.
 */
function a1(callback){
    console.log("a1")
    callback()
}
function a2(callback){
    console.log("a2")
    callback()
}
function a3(callback){
    console.log("a3")
    callback()
}
function a4(callback){
    console.log("a4")
    callback()
}
​
a1(function(){
    console.log("a1 callback")
    a2(function(){
        console.log("a2 callback")
        a3(function(){
            console.log("a3 callback")
            a4(function(){
                console.log("a4 callback")
            })
        })
    })
})
​
// a1 -> a1 print -> a1 callback -> a1 callback print -> a2 -> a2 print -> a2 callbakc ->
​
​
function a1promise(){
    return new Promise(function(resolve,reject){
        console.log("a1 promise")
        resolve()
    })
}
​
function a2promise(){
    return new Promise(function(resolve,reject){
        console.log("a2 promise")
        resolve()
    })
}
function a3promise(){
    return new Promise(function(resolve,reject){
        console.log("a3 promise")
        resolve()
    })
}
function a4promise(){
    return new Promise(function(resolve,reject){
        console.log("a4 promise")
        resolve()
    })
}
​
​
a1promise()
    .then(function(){
        console.log("a1 promise callback")
        a2promise()
    })
    .then(function(){
        console.log("a2 promise callback")
        a3promise()
    })
    .then(function(){
        console.log("a3 promise callback")
        a4promise()
    })
    .then(function(){
        console.log("a4 promise callback")
    })
    .catch(function(){
        console.log("error occured")
    })
​