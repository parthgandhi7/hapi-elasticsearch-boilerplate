'use strict';

const Hapi = require('hapi');

const allowedUnauthorizedPaths = ['/auth/login', '/user/hello', '/about'];

const server = new Hapi.Server();
server.connection({
  port: 3000
});

module.exports = server;
require('./modules/user/index');
require('./modules/books/index');
require('./config/connections');
require('./config/bootstrap');

var AuthService = require('./utils/AuthService');
server.ext('onRequest', function(req, res) {
  if (allowedUnauthorizedPaths.indexOf(req.url.path) !== -1) {
    res.continue();
  } else {
    if (!req.headers.authorization) {
      return res({
        message: 'You are not authorized'
      }).code(401);
    } else {
      AuthService.verifyToken(req.headers.authorization)
        .then(function(response) {
          if (response) {
            res.continue();
          } else {
            return res({
              message: 'You are not authorized'
            }).code(401);
          }
        })
        .fail(function(err) {
          return res({
            message: 'Some error occured, please try again!'
          }).code(500);
        })
    }
  }

});

server.register(require('vision'), (err) => {

    if (err) {
        throw err;
    }

    server.views({
        engines: { jade: require('jade') },
        path: __dirname + '/public',
        compileOptions: {
            pretty: true
        }
    });

});

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});

