'use strict';

var express = require('express');

var app = module.exports = express();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.txt');
});

app.get('/:version/:module/:class/:method', function(req, res) {
  // your magic goes here!
});

if (module.parent == null) {
  app.listen(3000, function() {
    console.log('Listening on %j', this.address());
  });
}
