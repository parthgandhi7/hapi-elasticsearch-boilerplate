var UserController = require('./UserController');
var path = require('path');
var requireFrom = require('requirefrom');
var rootPath = requireFrom('./');
var server = rootPath('server.js');

server.route({
  method: 'POST',
  path: '/user',
  handler: UserController.create
});

server.route({
  method: 'GET',
  path: '/user',
  handler: UserController.getAll
});

server.route({
  method: 'GET',
  path: '/user/byname/{name}',
  handler: UserController.getByName
});

server.route({
  method: 'GET',
  path: '/user/{userid}',
  handler: UserController.getById
});

server.route({
  method: 'POST',
  path: '/user/{userid}',
  handler: UserController.update
});

server.route({
  method: 'POST',
  path: '/auth/login',
  handler: UserController.login
});

server.register(require('inert'), function(err) {

  if (err) {
    console.log(err);
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/user/hello',
    handler: UserController.hello
  });
});

server.route({
  method: 'GET',
  path: '/about',
  handler: UserController.about
});

// server.register(require('inert'), function(err)   {

//   if (err) {
//     console.log(err);
//     throw err;
//   }

//   server.route({
//     method: 'GET',
//     path: '/user/hello',
//     handler: function(req, res) {
//       console.log("hello");
//       res.file('./user.html');
//     }
//   });
// });

// server.route({
//   method: 'GET',
//   path: '/user/hello',
//   handler: UserController.hello
// });
