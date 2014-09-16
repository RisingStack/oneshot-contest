'use strict';

var app = require('..');
var req = require('supertest');

describe('the app', function() {
  describe('index', function() {
    it('should return 200', function(done) {
      req(app)
        .get('/')
        .expect(200, done);
    });
    it('should return html', function(done) {
      req(app)
        .get('/')
        .expect('Content-Type', /html/, done);
    });
  });
  describe('docs', function() {
    it('should return 404 for missing versions', function(done) {
      req(app)
        .get('/v1.0.0/stream/Readable/read')
        .expect(302)
        .expect('Location', /best404/, done);
    });
    it('should return 404 for missing modules', function(done) {
      req(app)
        .get('/v0.10.31/magic/Readable/read')
        .expect(302)
        .expect('Location', /best404/, done);
    });
    it('should return 404 for missing classes', function(done) {
      req(app)
        .get('/v0.10.31/stream/Magical/read')
        .expect(302)
        .expect('Location', /best404/, done);
    });
    it('should return 404 for missing methods', function(done) {
      req(app)
        .get('/v0.10.31/stream/Readable/foo')
        .expect(302)
        .expect('Location', /best404/, done);
    });
    it('should return 200', function(done) {
      req(app)
        .get('/v0.10.31/stream/Readable/read')
        .expect('Content-Type', /html/)
        .expect(200, done);
    });
    it('should return method signature', function(done) {
      req(app)
        .get('/v0.10.31/stream/Readable/read')
        .expect(/<h1>readable\.read\(\[size\]\)<\/h1>/, done);
    });
    it('should return method description', function(done) {
      req(app)
        .get('/v0.10.31/stream/Readable/read')
        .expect(/method pulls some data out of the/, done);
    });
  });
  describe('assets', function() {
    it('should server style', function(done) {
      req(app)
        .get('/style.css')
        .expect(200)
        .expect('Content-Type', /css/, done);
    });
  });
});
