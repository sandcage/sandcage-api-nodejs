/**
 * Created by vedi on 29/10/2016.
 */

'use strict';

const expect = require('chai').expect;

const specHelper = require('../lib/spec-helper');
const Sandcage = require('../..');

const RIGHT_KEY = specHelper.RIGHT_KEY;
const WRONG_KEY = specHelper.WRONG_KEY;
const REQUEST_ID = 'req_B8r09x8SucENLdGmHD8s08HDZDOEon';
const JOBS = [
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

const CALLBACK_URL = 'http://www.example.com/callback_url';

const FILES = [
  {
    "reference_id": "40s"
  },
  {
    "file_token": "file_hd869xazuhwm62f9rc6qjcj7u_v6x8akrqgpi"
  }
];

describe('Sandcage', () => {

  const sandcage = new Sandcage({apiKey: RIGHT_KEY});
  const sandcageWithWrongKey = new Sandcage({apiKey: WRONG_KEY});

  before('init nock', () => {
    specHelper.initNock();
  });

  describe('getInfo', () => {

    let response;

    before('call getInfo', () => {
      return sandcage
        .getInfo({'request_id': REQUEST_ID})
        .then((result) => {
          response = result;
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

    before('call getInfo', () => {
      return sandcageWithWrongKey
        .getInfo({'request_id': REQUEST_ID})
        .catch((err) => {
          response = err;
        });
    });

    it('should catch error', () => {
      return expect(response).to.exist;
    });
  });

  describe('listFiles', () => {

    let response;

    before('call listFiles', () => {
      return sandcage
        .listFiles({directory: 'img/'})
        .then((result) => {
          response = result;
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

    before('call listFiles', () => {
      return sandcageWithWrongKey
        .listFiles({directory: 'img/'})
        .catch((err) => {
          response = err;
        });
    });

    it('should catch error', () => {
      return expect(response).to.exist;
    });
  });

  describe('scheduleTasks', () => {

    let response;

    before('call scheduleTasks', () => {
      return sandcage
        .scheduleFiles({jobs: JOBS}, CALLBACK_URL)
        .then((result) => {
          response = result;
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

    before('call scheduleTasks', () => {
      return sandcageWithWrongKey
        .scheduleFiles({jobs: JOBS}, CALLBACK_URL)
        .catch((err) => {
          response = err;
        });
    });

    it('should catch error', () => {
      return expect(response).to.exist;
    });
  });

  describe('destroyFiles', () => {

    let response;

    before('call destroyFiles', () => {
      return sandcage
        .destroyFiles({files: FILES}, CALLBACK_URL)
        .then((result) => {
          response = result;
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

    before('call destroyFiles', () => {
      return sandcageWithWrongKey
        .destroyFiles({files: FILES}, CALLBACK_URL)
        .catch((err) => {
          response = err;
        });
    });

    it('should catch error', () => {
      return expect(response).to.exist;
    });
  });

});

