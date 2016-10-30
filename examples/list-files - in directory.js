
'use strict';

const Sandcage = require('..');

const sandcage = new Sandcage('[YOUR SANDCAGE API KEY]');
const payload = {
  directory: '[relative directory]'
};

sandcage
  .listFiles(payload)
  .then((result) => {
    console.log(result);
  });