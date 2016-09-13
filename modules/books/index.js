var BooksController = require('./BooksController');

var requireFrom = require('requirefrom');
var rootPath = requireFrom('./');
var server = rootPath('server.js');

server.route({
  method: 'POST',
  path: '/books',
  handler: BooksController.create
});

server.route({
  method: 'POST',
  path: '/books/search',
  handler: BooksController.search
});

// server.route({
//   method: 'GET',
//   path: '/books',
//   handler: BooksController.getAll
// });

// server.route({
//   method: 'GET',
//   path: '/user/byname/{name}',
//   handler: BooksController.getByName
// });

server.route({
  method: 'GET',
  path: '/books/{bookid}',
  handler: BooksController.getById
});

server.route({
  method: 'POST',
  path: '/books/{bookid}',
  handler: BooksController.update
});