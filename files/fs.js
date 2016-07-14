/**
 * Created by rahul on 8/7/16.
 */

var fs = require('fs');
fs.writeFileSync("corn.txt","Corn is good, corn is life");
console.log(fs.readFileSync(("corn.txt").toString()));