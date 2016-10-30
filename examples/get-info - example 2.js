
'use strict';

const Sandcage = require('..');

const sandcage = new Sandcage('[YOUR SANDCAGE API KEY]');
const payload = {
  files: [
    {'file_token': '[file_token 1]'},
    {'file_token': '[file_token 2]'}
  ]
};

sandcage
  .getInfo(payload)
  .then((result) => {
    console.log(result);
  });