
'use strict';

var Sandcage = require('..');

var sandcage = new Sandcage({apiKey: '[YOUR SANDCAGE API KEY]'});
var payload = {
  files: [
    {'file_token': '[file_token 1]'},
    {'file_token': '[file_token 2]'}
  ]
};

sandcage
  .getInfo(payload)
  .then(function(result) {
    console.log(result);
  });