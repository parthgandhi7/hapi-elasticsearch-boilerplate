 'use strict'
 const mongoConnection = {
   username: 'mockuser',
   password: 'mockpassword',
   url: 'ds019796.mlab.com',
   db: 'mockdb',
   port: 19796
 };
 const elasticConnection = {
   host: 'localhost:9200',
   log: 'info'
 }
 const elasticsearch = require('elasticsearch');
 var elasticClient = new elasticsearch.Client(elasticConnection);

 const mongoConnectionString = 'mongodb://' + mongoConnection.username + ':' + mongoConnection.password + '@' + mongoConnection.url + ':' + mongoConnection.port + '/' + mongoConnection.db;
 console.log(mongoConnectionString);
 const mongoose = require('mongoose');
 mongoose.connect(mongoConnectionString);
 module.exports.mongoose = mongoose;

 module.exports.elasticClient = elasticClient;
