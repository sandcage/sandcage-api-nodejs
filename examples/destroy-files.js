
'use strict';

var Sandcage = require('..');

var sandcage = new Sandcage('[YOUR SANDCAGE API KEY]');
var payload = {
  files: [
    {'reference_id': '[reference_id]'},
    {'file_token': '[file_token]'}
  ]
};
var callbackUrl = '';

sandcage
  .destroyFiles(payload, callbackUrl)
  .then(function(result) {
    console.log(result);
  });