
'use strict';

var Sandcage = require('..');

var sandcage = new Sandcage('[YOUR SANDCAGE API KEY]');
var payload = {
  jobs: [
    {
      url: 'http://cdn.sandcage.com/p/a/img/logo.jpg',
      tasks: [
        {
          actions: 'save'
        },
        {
          actions: 'resize',
          filename: 'hello_world.jpg',
          width: 200
        },
        {
          actions: 'crop',
          coords: '10,10,50,50'
        },
        {
          'reference_id': '123456789',
          actions: 'rotate',
          degrees: 90
        },
        {
          actions: 'cover',
          width: 60,
          height: 60,
          cover: 'middle,center'
        }
      ]
    },
    {
      url: 'http://cdn.sandcage.com/p/a/img/header_404.png',
      tasks: [
        {
          actions: 'resize',
          height: 30
        }
      ]
    }
  ]
};

var callbackUrl = '';

sandcage
  .scheduleFiles(payload, callbackUrl)
  .then(function(result) {
    console.log(result);
  });