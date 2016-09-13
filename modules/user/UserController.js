'use strict'
var User = require('./User.js');
var bcrypt = require('bcryptjs');
var path = require('path');

// sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken');
var requireFrom = require('requirefrom');
var config = requireFrom('config');
var configjson = config('globals.json');
const JWT_SECRET = configjson.JWT_SECRET;
const SALT = bcrypt.genSaltSync(10);
var user = {
  create: function(req, res) {
    var userObj = req.payload;
    console.log("Create");
    if (!userObj.name || !userObj.password) {
      return res({
        message: 'Invalid user details'
      }).code(400);
    }
    User.findByName(userObj.name, function(err, users) {
      console.log("inside");
      if (err) {
        res(err).code(500);
      } else {
        if (users && users.length === 0) {
          if (userObj.password) {
            var hash = bcrypt.hashSync(userObj.password, SALT);
            userObj.password = hash;
          }
          User.create(userObj, function(err, user) {
            if (err) {
              res(err).code(500);
            } else {
              res(user).code(200);
            }
          });
        } else {
          res({
            message: 'User already exists with the same name. Please use a different username'
          }).code(400);
        }
      }
    });

  },
  getAll: function(req, res) {
    User.find().exec(function(err, users) {
      if (err) {
        res(err).code(500);
      } else {
        res(users).code(200);
      }
    });
  },

  getByName: function(req, res) {
    User.findByName(req.params.name, function(err, users) {
      if (err) {
        res(err).code(500);
      } else {
        res(users).code(200);
      }
    });
  },

  getById: function(req, res) {
    console.log(req.params.userid);
    User.findOne({
      _id: req.params.userid
    }, function(err, user) {
      if (err) {
        res(err).code(500);
      } else {
        res(user).code(200);
      }
    });
  },

  update: function(req, res) {
    var userObj = req.payload;
    if (userObj.password) {
      var hash = bcrypt.hashSync(userObj.password, SALT);
      userObj.password = hash;
    }

    User.findOneAndUpdate({
      _id: req.params.userid
    }, {
      $set: userObj
    }, {
      new: true
    }, function(err, user) {
      if (err) {
        res(err).code(500);
      } else {
        res(user).code(200);
      }

    });
  },
  login: function(req, res) {
    var userObj = req.payload;
    if (!userObj.name || !userObj.password) {
      return res({
        message: 'Invalid login details'
      }).code(400);
    }
    User.findByName(userObj.name, function(err, users) {
      if (err) {
        res(err).code(500);
      } else {
        if (!users || users.length === 0 || !users[0].password) {
          res({
            message: 'User with specified username does not exists'
          }).code(400);
        } else {
          var passwordCompare = bcrypt.compareSync(userObj.password, users[0].password);
          if (!passwordCompare) {
            res({
              message: 'Invalid password'
            }).code(400);
          } else {
            delete users[0].password;
            var token = jwt.sign(users[0], JWT_SECRET);

            res({
              message: 'Login successfull',
              token: token
            }).code(200);
          }
        }
      }
    });
  },
  hello: function(req, res) {
    var htmlpath = path.join(__dirname, 'user.html');
    res.file(htmlpath);
  },
  about: function(req, res) {
    res.view('index', {
      title: 'Hapi ' + req.server.version,
      message: 'Index - Hello World!'
    });
  }
};

module.exports = user;
