![SandCage](https://d18m5nnl28b2pp.cloudfront.net/p/a/img/header.png)

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/sandcage/sandcage-api-nodejs/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/sandcage/sandcage-api-nodejs/?branch=master)
[![Build Status](https://travis-ci.org/sandcage/sandcage-api-nodejs.svg?branch=master)](https://travis-ci.org/sandcage/sandcage-api-nodejs)

sandcage-api-nodejs is a Node.js library for interfacing with SandCage's API. The API documentation can be found at https://www.sandcage.com/docs/0.2/


### Table of Contents
* [Requirements](https://github.com/sandcage/sandcage-api-nodejs/blob/master/README.md#requirements)
* [Usage](https://github.com/sandcage/sandcage-api-nodejs/blob/master/README.md#usage)
* [Examples](https://github.com/sandcage/sandcage-api-nodejs/tree/master/examples)
* [Contributing](https://github.com/sandcage/sandcage-api-nodejs/blob/master/README.md#contribute)
* [Contact Us](https://www.sandcage.com/contact)


<a name="requirements" /></a>
## Requirements

* A SandCage account, in order to get your SandCage API Key. Once logged into SandCage get your API Key at https://www.sandcage.com/panel/api_key


<a name="usage" /></a>
## Usage

```javascript
var sandcage = new Sandcage({apiKey: '[YOUR SANDCAGE API KEY]'});
sandcage
  .listFiles({
    'key': '[YOUR SANDCAGE API KEY]'
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.error(err);
  });
```

or with callbacks

```javascript
var sandcage = new SandCage('[YOUR SANDCAGE API KEY]');
sandcage.listFiles({}, function(err, response) {
  console.log(response);
})
```

<a name="contribute" /></a>
## Contributing

We are open to suggestions and code revisions, however there are some rules and limitations that you might want to consider first.

* Code that you contribute will automatically be licensed under the [Apache License Version 2.0](https://github.com/sandcage/sandcage-api-nodejs/blob/master/LICENSE).
* Third party code will be reviewed, tested and possibly modified before being released.

These basic rules help ensure that this code remains Open Source and compatible with Apache 2.0 license. All contributions will be added to the changelog and appear in every release.