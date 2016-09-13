"use strict"
const q = require('q');
const requireFrom = require('requirefrom');
const config = requireFrom('config');
const connections = config('connections.js');
const elasticClient = connections.elasticClient;
var ElasticSearch = {
  initMapping: function(indexName, body, type) {
    return elasticClient.indices.putMapping({
      index: indexName,
      type: type,
      body: body
    });
  },
  addUpdateDocument: function(indexName, document, type, id) {
    return elasticClient.index({
      index: indexName,
      id: id,
      type: type,
      body: document
    });
  },
  getSuggestions: function(indexName, body, type) {
    return elasticClient.suggest({
      index: indexName,
      type: type,
      body: body
    })
  },
  indexExists: function(indexName) {
    return elasticClient.indices.exists({
      index: indexName
    });
  },
  initIndex: function(indexName, body) {
    return elasticClient.indices.create({
      index: indexName,
      body: body
    });
  },
  getClusterHealth: function(params) {
    return elasticClient.cluster.health(params);
  },
  bulk: function(body) {
    return elasticClient.bulk(body);
  },
  getById: function(indexName, type, id) {
    return elasticClient.getSource({
    	index: indexName,
    	type: type,
    	id: id
    });
  },
  searchDocuments: function(indexName, query) {
    return elasticClient.search({
    	index: indexName,
    	q: query
    });  	
  }

};
module.exports = ElasticSearch;
