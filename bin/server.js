require("babel/register");

var express = require('express');
var index = require('../lib/index');

var app = express();

app.use('/', index);

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
