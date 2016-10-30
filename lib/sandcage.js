
'use strict';

var request = require('request-promise');

var API_VERSION = '0.2';
var ENDPOINT_BASE = `https://api.sandcage.com/${API_VERSION}/`;

var END_POINTS = {
  GET_INFO: 'get-info',
  LIST_FILES: 'list-files',
  SCHEDULE_TASKS: 'schedule-tasks',
  DESTROY_FILES: 'destroy-files',
};

class Sandcage {

  /**
   * @param {Object} options options for the service
   * @param {String} options.apikey Api key, mandatory
   */
  constructor(options) {
    options = options || {};
    if (!options.apiKey) {
      throw new Error('Provide your SandCage API Key.', 'MissingKey');
    }
    this.apiKey = options.apiKey;
  }

  /**
   * The "get-info" service
   * @param {Object} params the parameters to pass to the request
   * @param {String} [params.request_id] The request_id that was returned in the request for which you want to get the
   * status.
   If provided, the response will include details for all the files that where part of the request.
   If a value is not provided for this parameter, then an array of files must be provided.
   * @param {Array} [params.files] 	An array of files.
   If a value is not provided for this parameter, then a value must be provided for the "request_id" parameter.
   If a value is provided for the "request_id" parameter, then this array of files will be disregarded.
   * @param {String} [params.files.file_token] The file_token of the file for which you want to get the status.
   * This returned as part of the response of a request to the schedule-tasks service.
   * @param {Function} [callback] callback an optional callback to execute when the API call is complete
   * @returns {Promise}
   */
  getInfo(params, callback) {
    if (params === null || Object.keys(params).length === 0) {
      var err = new Error('No params provided');
      if (callback) {
        callback(err);
      }
      return Promise.reject(err);
    }
    return this._sendRequest(END_POINTS.GET_INFO, params, '', callback);
  }


  /**
   * The "list-files" service
   * @param {Object} params the parameters to pass to the request
   * @param {String} [params.directory] The relative directory to search through. Default is the root directory.
   * @param {Number} [params.page] The targeted paginated results. Default is 1.
   * @param {Number} [params.results_per_page] The amount of file entries that should be returned per request.
   * Default is 100.
   * @param {Function} [callback] callback an optional callback to execute when the API call is complete
   * @returns {Promise}
   */
  listFiles(params, callback) {
    if (params === null || Object.keys(params).length === 0) {
      var err = new Error('No params provided');
      if (callback) {
        callback(err);
      }
      return Promise.reject(err);
    }
    return this._sendRequest(END_POINTS.LIST_FILES, params, '', callback);
  };

  /**
   * The "schedule-tasks" service
   * @param {Object} params the parameters to pass to the request
   * @param {Array} params.jobs An array of tasks.
   * This will only be included as part of the response if the value of "status" was not "error".
   * @param {String} [callbackEndpoint] an optional callback endpoint, to which a request will be sent whenever there is an update for any of the tasks included in this request. See https://www.sandcage.com/docs/0.2/schedule_tasks#callbacks for an example
   * @param {Function} [callback] callback an optional callback to execute when the API call is complete
   * @returns {Promise}
   */
  scheduleFiles(params, callbackEndpoint, callback) {

    if (params === null || Object.keys(params).length === 0) {
      var err = new Error('No params provided');
      if (callback) {
        callback(err);
      }
      return Promise.reject(err);
    }

    if (callbackEndpoint == null) {
      callbackEndpoint = '';
    }
    return this._sendRequest(END_POINTS.SCHEDULE_TASKS, params, callbackEndpoint, callback);
  }


  /**
   * The "destroy-files" service
   * @param {Object} params the parameters to pass to the request
   * @param {Array} params.files An array of files to be deleted.
   * @param {String} callbackEndpoint an optional callback endpoint, to which a request will be sent whenever there is an update for any of the tasks included in this request. See https://www.sandcage.com/docs/0.2/destroy_files#callbacks for an example
   * @param {Function} [callback] callback an optional callback to execute when the API call is complete
   * @returns {Promise}
   */
  destroyFiles(params, callbackEndpoint, callback) {
    if (params === null || Object.keys(params).length === 0) {
      var err = new Error('No params provided');
      if (callback) {
        callback(err);
      }
      return Promise.reject(err);
    }

    if (callbackEndpoint == null) {
      callbackEndpoint = '';
    }
    return this._sendRequest(END_POINTS.DESTROY_FILES, params, callbackEndpoint, callback);
  }

  _sendRequest(serviceEndpoint, params, callbackEndpoint, callback) {
    var payload = Object.assign({
      key: this.apiKey
    }, params);

    if (callbackEndpoint && callbackEndpoint !== '') {
      payload['callback_url'] = callbackEndpoint;
    }

    var options = {
      method: 'POST',
      uri: ENDPOINT_BASE + serviceEndpoint,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(payload),
      json: true
    };

    return request(options)
      .then(function(result) {
        if (callback) {
          return callback(null, result);
        } else {
          return result;
        }
      })
      .catch(function(err) {
        if (callback) {
          return callback(err);
        } else {
          throw err;
        }
      });
  }
}

module.exports = Sandcage;