var requireFrom = require('requirefrom');
var utils = requireFrom('utils');
var elastic = utils('ElasticSearchService');

var books = {
  create: function(req, res) {
    var booksObj = req.payload;
    if (!booksObj.title) {
      return res({
        message: 'Invalid book details'
      }).code(400);
    }
    elastic.addUpdateDocument('book', booksObj, 'document')
      .then(function(response) {
        res(response).code(200);
      })
      .catch(function(err) {
        res(err).code(500);
      })
  },
  getById: function(req, res) {
    console.log(req.params.bookid);
    elastic.getById('book', 'document', req.params.bookid)
      .then(function(response) {
        res(response).code(200);
      })
      .catch(function(err) {
        res(err).code(500);
      })
  },
  update: function(req, res) {
    var booksObj = req.payload;
    elastic.addUpdateDocument('book', booksObj, 'document', req.params.bookid)
      .then(function(response) {
        res(response).code(200);
      })
      .catch(function(err) {
        res(err).code(500);
      })
  },
  search: function(req, res) {
    var searchObj = req.payload;
    var query = '';
    for (var key in searchObj) {
      if (query !== '') {
        query += ' AND '
      }
      if (searchObj[key]) {
        query = query + key + ':' + searchObj[key];
      }
    }

    console.log(query);
    elastic.searchDocuments('book', query)
      .then(function(response) {
        res(response).code(200);
      })
      .catch(function(err) {
        res(err).code(500);
      })
  }
};

module.exports = books;
