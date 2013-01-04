var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

// Connect to cloud database
var username = "seb";
var password = "beetroot0";
var address = '@ds047037.mongolab.com:47037/seb_mongodb';
connect();

// Connect to mongo
function connect() {
  var url = 'mongodb://' + username + ':' + password + address;
  mongoose.connect(url);
}

function disconnect() {mongoose.disconnect()}
