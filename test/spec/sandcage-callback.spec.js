
'use strict';

var expect = require('chai').expect;

var specHelper = require('../lib/spec-helper');
var Sandcage = require('../..');

var RIGHT_KEY = specHelper.RIGHT_KEY;
var WRONG_KEY = specHelper.WRONG_KEY;
var REQUEST_ID = 'req_B8r09x8SucENLdGmHD8s08HDZDOEon';
var JOBS = [
  {
    "url": "http://cdn.sandcage.com/p/a/img/logo.jpg",
    "tasks": [
      {
        "actions": "save"
      },
      {
        "actions": "resize",
        "filename": "hello_world.jpg",
        "width": 200
      },
      {
        "actions": "crop",
        "coords": "10,10,50,50"
      },
      {
        "reference_id": "123456789",
        "actions": "rotate",
        "degrees": 90
      },
      {
        "actions": "cover",
        "width": 60,
        "height": 60,
        "cover": "middle,center"
      }
    ]
  },
  {
    "url": "http://cdn.sandcage.com/p/a/img/header_404.png",
    "tasks": [
      {
        "actions": "resize",
        "height": 30
      }
    ]
  }
];

var CALLBACK_URL = 'http://www.example.com/callback_url';

var FILES = [
  {
    "reference_id": "40s"
  },
  {
    "file_token": "file_hd869xazuhwm62f9rc6qjcj7u_v6x8akrqgpi"
  }
];

describe('Sandcage with callback', function() {

  var sandcage = new Sandcage({apiKey: RIGHT_KEY});
  var sandcageWithWrongKey = new Sandcage({apiKey: WRONG_KEY});

  before('init nock', function() {
    specHelper.initNock();
  });

  describe('getInfo', function() {

    let response;

    before('call getInfo', function(done) {
      sandcage
        .getInfo({'request_id': REQUEST_ID}, function(err, result) {
          response = result;
          done();
        });
    });

    it('should contain status', function() {
      return expect(response.status).to.exist;
    });

    it('status should be "success"', function() {
      expect(response.status).to.be.equal('success');
    });

    it('files should be an array', function() {
      expect(response.files).to.be.an('array');
    });
  });

  describe('getInfo with wrong key', function() {

    let response;

    before('call getInfo', function(done) {
      sandcageWithWrongKey
        .getInfo({'request_id': REQUEST_ID}, function(err) {
          response = err;
          done();
        });
    });

    it('should catch error', function() {
      return expect(response).to.exist;
    });
  });

  describe('listFiles', function() {

    let response;

    before('call listFiles', function(done) {
      sandcage
        .listFiles({directory: 'img/'}, function(err, result) {
          response = result;
          done();
        });
    });

    it('should contain status', function() {
      return expect(response.status).to.exist;
    });

    it('status should be "success"', function() {
      expect(response.status).to.be.equal('success');
    });

    it('files should be an array', function() {
      expect(response.files).to.be.an('array');
    });
  });

  describe('listFiles with wrong key', function() {

    let response;

    before('call listFiles', function(done) {
      sandcageWithWrongKey
        .listFiles({directory: 'img/'}, function(err) {
          response = err;
          done();
        });
    });

    it('should catch error', function() {
      return expect(response).to.exist;
    });
  });

  describe('scheduleTasks', function() {

    let response;

    before('call scheduleTasks', function(done) {
      sandcage
        .scheduleFiles({jobs: JOBS}, CALLBACK_URL, function(err, result) {
          response = result;
          done();
        });
    });

    it('should contain status', function() {
      return expect(response.status).to.exist;
    });

    it('status should be "success"', function() {
      expect(response.status).to.be.equal('success');
    });

    it('tasks should be an array', function() {
      expect(response.tasks).to.be.an('array');
    });
  });

  describe('scheduleTasks with wrong key', function() {

    let response;

    before('call scheduleTasks', function(done) {
      sandcageWithWrongKey
        .scheduleFiles({jobs: JOBS}, CALLBACK_URL, function(err, result) {
          response = err;
          done();
        });
    });

    it('should catch error', function() {
      return expect(response).to.exist;
    });
  });

  describe('destroyFiles', function() {

    let response;

    before('call destroyFiles', function(done) {
      sandcage
        .destroyFiles({files: FILES}, CALLBACK_URL, function(err, result) {
          response = result;
          done();
        });
    });

    it('should contain status', function() {
      return expect(response.status).to.exist;
    });

    it('status should be "success"', function() {
      expect(response.status).to.be.equal('success');
    });

  });

  describe('destroyFiles with wrong key', function() {

    let response;

    before('call destroyFiles', function(done) {
      sandcageWithWrongKey
        .destroyFiles({files: FILES}, CALLBACK_URL, function(err, result) {
          response = err;
          done();
        });
    });

    it('should catch error', function() {
      return expect(response).to.exist;
    });
  });

});

