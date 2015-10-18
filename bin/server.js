require("babel/register");

require('dotenv').config({ silent: true });

var express = require('express');
var app = express();
var index = require('../src/index');
var user = require('../src/api/user');

app.use('/', index);
app.use('/api/user/', user);

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
