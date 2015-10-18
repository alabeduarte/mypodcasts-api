#!/usr/bin/env node
require('babel/register');
require('dotenv').config({ silent: true });

var database = require('../config/database');
database.connect(function (err) {
  if (err) { console.log(err); return; }
  console.log("Client DB: connected");

  var User = require('../src/models/user');
  var UserFeed = require('../src/models/userFeed');

  function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
      for (var prop in source) {
        target[prop] = source[prop];
      }
    });

    return target;
  }

  console.log('[INFO] Preparing to run all seeds');
  require('mongoose').connection.db.dropDatabase();

  var users = require('./seedsData/users');
  User.create(users)
    .then(function (users) {
      console.log('[INFO] All users has been created', users);

      return User.find({}).exec();
    })
  .then(function (users) {
    return users.map(function (user) {
      console.log('[INFO] User created: ', user);

      var userFeeds = require('./seedsData/userFeeds');
      return userFeeds.map(function (userFeed) {
        var properties = extend({}, userFeed, { userId: user.id });
        console.log('[INFO] Prepare to create a feed with: ', properties);

        return UserFeed.create(new UserFeed(properties));
      });
    });
  })
  .then(function () {
    process.exit(0);
  });
});
