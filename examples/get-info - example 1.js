
'use strict';

const Sandcage = require('..');

const sandcage = new Sandcage('[YOUR SANDCAGE API KEY]');
const payload = {
  'request_id': '[request_id]'
};

sandcage
  .getInfo(payload)
  .then((result) => {
    console.log(result);
  });