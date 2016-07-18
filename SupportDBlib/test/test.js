var expect = require('chai').expect;
describe('dbTestCases', function () {
    /*
     test case for new db utility

     */
    it('testInsert', function (done) {
        var data = {}
        var dbInstance = require("/home/rahul/Documents/nodejsprojects/SupportDBlib/node_modules/SupportD/CURD.js");
        var db = new dbInstance("newDB");
        return db.insert({username : "Rahul Goel" },"user").then(function(UserData){

            printConsole("data",UserData)
            // printConsole("data",JSON.stringify(UserData))

            expect("Rahul Goel").to.equal(UserData.ops[0].username);
        }).then(function(){
            console.log("Done")
            done();
        }).fail(function(err){
            console.log("Err !!"+err)

        })
    });
});
var printConsole = function(parm,obj){
    if(obj != undefined)
        console.log(parm,JSON.stringify(obj))
    else
        console.log(parm)
}
