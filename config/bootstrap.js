var requireFrom = require('requirefrom');
var utils = requireFrom('utils');
var elastic = utils('ElasticSearchService');
var config = requireFrom('config');
var configjson = config('globals.json');
var async = require('async');
var elasticSearchIndices = configjson.elasticsearchindices;

async.each(elasticSearchIndices, function(index, callback) {
  elastic.indexExists(index.name)
    .then(function(exists) {
      if (exists) {
        console.log("if");
        return callback();
      } else {
        console.log("else")
        return elastic.initIndex(index.name, index.body)
          .then(function(response) {
            callback();
          })
      }

    })
    .catch(function(err) {
      callback(err);
    })
}, function(err) {
  if (err) {
    console.log(err);
  }
});
