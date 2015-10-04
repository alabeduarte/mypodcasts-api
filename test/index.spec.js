var request = require('supertest');
var express = require('express')
var app = require('../lib/index')

describe('index', function () {
  describe('GET /', function () {
    it('returns success!', function (done) {
      request(app)
        .get('/')
        .expect(200, { success: true }, done);
    });
  });
});
