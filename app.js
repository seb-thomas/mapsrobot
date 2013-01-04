
/**
 * Module dependencies.
 */
var connect = require('connect');
connect.createServer(
    connect.static(__dirname)
).listen(3000);
console.log("Connect server listening on port 3000");
