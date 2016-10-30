
'use strict';

var Sandcage = require('..');

var sandcage = new Sandcage('[YOUR SANDCAGE API KEY]');
var payload = {
  page: 1
};

sandcage
  .listFiles(payload)
  .then((result) => {
    console.log(result);
  });