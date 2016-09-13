
var requireFrom = require('requirefrom');
var config = requireFrom('config');
var connections = config('connections.js');
var mongoose = connections.mongoose;
var userSchema = mongoose.Schema({
  name: String,
  password: String
});

userSchema.statics.findByName = function(name, cb) {
  return this.find({
    name: new RegExp(name, 'i')
  }, cb);
};

var User = mongoose.model('User', userSchema);
module.exports = User;
