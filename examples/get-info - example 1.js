
'use strict';

var Sandcage = require('..');

var sandcage = new Sandcage({apiKey: '[YOUR SANDCAGE API KEY]'});
var payload = {
  'request_id': '[request_id]'
};

sandcage
  .getInfo(payload)
  .then(function(result) {
    console.log(result);
  });