
'use strict';

var Sandcage = require('..');

var sandcage = new Sandcage('[YOUR SANDCAGE API KEY]');
var payload = {
  'request_id': '[request_id]'
};

sandcage
  .getInfo(payload)
  .then((result) => {
    console.log(result);
  });