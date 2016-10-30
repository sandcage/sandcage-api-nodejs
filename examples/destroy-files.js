
'use strict';

const Sandcage = require('..');

const sandcage = new Sandcage('[YOUR SANDCAGE API KEY]');
const payload = {
  files: [
    {'reference_id': '[reference_id]'},
    {'file_token': '[file_token]'}
  ]
};
const callbackUrl = '';

sandcage
  .destroyFiles(payload, callbackUrl)
  .then((result) => {
    console.log(result);
  });