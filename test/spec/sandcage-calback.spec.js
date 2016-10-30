
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

describe('Sandcage with callback', () => {

  var sandcage = new Sandcage({apiKey: RIGHT_KEY});
  var sandcageWithWrongKey = new Sandcage({apiKey: WRONG_KEY});

  before('init nock', () => {
    specHelper.initNock();
  });

  describe('getInfo', () => {

    let response;

    before('call getInfo', (done) => {
      sandcage
        .getInfo({'request_id': REQUEST_ID}, (err, result) => {
          response = result;
          done();
        });
    });

    it('should contain status', () => {
      return expect(response.status).to.exist;
    });

    it('status should be "success"', () => {
      expect(response.status).to.be.equal('success');
    });

    it('files should be an array', () => {
      expect(response.files).to.be.an('array');
    });
  });

  describe('getInfo with wrong key', () => {

    let response;

    before('call getInfo', (done) => {
      sandcageWithWrongKey
        .getInfo({'request_id': REQUEST_ID}, (err) => {
          response = err;
          done();
        });
    });

    it('should catch error', () => {
      return expect(response).to.exist;
    });
  });

  describe('listFiles', () => {

    let response;

    before('call listFiles', (done) => {
      sandcage
        .listFiles({directory: 'img/'}, (err, result) => {
          response = result;
          done();
        });
    });

    it('should contain status', () => {
      return expect(response.status).to.exist;
    });

    it('status should be "success"', () => {
      expect(response.status).to.be.equal('success');
    });

    it('files should be an array', () => {
      expect(response.files).to.be.an('array');
    });
  });

  describe('listFiles with wrong key', () => {

    let response;

    before('call listFiles', (done) => {
      sandcageWithWrongKey
        .listFiles({directory: 'img/'}, (err) => {
          response = err;
          done();
        });
    });

    it('should catch error', () => {
      return expect(response).to.exist;
    });
  });

  describe('scheduleTasks', () => {

    let response;

    before('call scheduleTasks', (done) => {
      sandcage
        .scheduleFiles({jobs: JOBS}, CALLBACK_URL, (err, result) => {
          response = result;
          done();
        });
    });

    it('should contain status', () => {
      return expect(response.status).to.exist;
    });

    it('status should be "success"', () => {
      expect(response.status).to.be.equal('success');
    });

    it('tasks should be an array', () => {
      expect(response.tasks).to.be.an('array');
    });
  });

  describe('scheduleTasks with wrong key', () => {

    let response;

    before('call scheduleTasks', (done) => {
      sandcageWithWrongKey
        .scheduleFiles({jobs: JOBS}, CALLBACK_URL, (err, result) => {
          response = err;
          done();
        });
    });

    it('should catch error', () => {
      return expect(response).to.exist;
    });
  });

  describe('destroyFiles', () => {

    let response;

    before('call destroyFiles', (done) => {
      sandcage
        .destroyFiles({files: FILES}, CALLBACK_URL, (err, result) => {
          response = result;
          done();
        });
    });

    it('should contain status', () => {
      return expect(response.status).to.exist;
    });

    it('status should be "success"', () => {
      expect(response.status).to.be.equal('success');
    });

  });

  describe('destroyFiles with wrong key', () => {

    let response;

    before('call destroyFiles', (done) => {
      sandcageWithWrongKey
        .destroyFiles({files: FILES}, CALLBACK_URL, (err, result) => {
          response = err;
          done();
        });
    });

    it('should catch error', () => {
      return expect(response).to.exist;
    });
  });

});

