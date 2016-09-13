const jwt = require('jsonwebtoken');
const requireFrom = require('requirefrom');
var config = requireFrom('config');
var configjson = config('globals.json');
const JWT_SECRET = configjson.JWT_SECRET;
const q = require('q');
var Auth = {
	verifyToken: function(token) {
		var deferred = q.defer();
		jwt.verify(token, JWT_SECRET, function(err, decoded) {
			if (err) {
				deferred.resolve();
			} else {
				deferred.resolve(decoded);
			}	
		});

		return deferred.promise;
	}
};
module.exports = Auth;