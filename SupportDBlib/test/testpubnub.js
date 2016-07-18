/**
 * Created by rahul on 18/7/16.
 */

var expect = require('chai').expect;

describe('pubnubTestCases', function () {

     //test case for publish
    it('testpublish', function (done) {
        var p_key = "";
        var s_key = "";
        var ssl = "";
        //Generate UUID and pass this here
        var uuid = "";
        var channel = "";
        var message = "";
        var data = {};
        
        //Enter location of pubnub library
        var pbInstance = require("");
        var pb = new pbInstance(p_key,s_key,ssl,uuid);

        return pb.publish(channel, message).then(function(MsgData){
            printConsole("data",MsgData)

            // Provide with expect and Equal Value
            expect("").to.equal();
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
