require("babel/register");

var express = require('express');
var app = express();
var index = require('../lib/index');
var user = require('../lib/api/user');

app.use('/', index);
app.use('/api/user/', user);

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
