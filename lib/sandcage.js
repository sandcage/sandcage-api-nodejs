/**
 * Created by vedi on 24/10/2016.
 */

'use strict';

const request = require('request-promise');

const API_VERSION = '0.2';
const ENDPOINT_BASE = `https://api.sandcage.com/${API_VERSION}/`;

const END_POINTS = {
  GET_INFO: 'get-info',
  LIST_FILES: 'list-files',
  SCHEDULE_TASKS: 'schedule-tasks',
  DESTROY_FILES: 'destroy-files',
};

class SandCage {

  constructor() {
    if (!this.apikey) {
      throw new Error('Provide your SandCage API Key.', 'MissingKey');
    }
    this.apikey = apikey;
  }

  call(service_endpoint, params, callbackEndpoint, callback) {
    const payload = Object.assign({
      key: self.apikey
    }, params);

    if (callbackEndpoint && callbackEndpoint !== '') {
      payload['callback_url'] = callbackEndpoint;
    }

    const options = {
      method: 'POST',
      uri: ENDPOINT_BASE + service_endpoint,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload,
      json: true
    };

    return request(options)
      .then((parsedBody) => {
        const res = parsedBody;

        if (callback) {
          return callback(null, res);
        }
      })
      .catch((err) => {
        if (callback) {
          return callback(err);
        }
      });
  }

  /**
   * The "get-info" service
   * @param {Object} params the hash of the parameters to pass to the request
   * @option params {String} name the immutable name of an existing template
   */
  getInfo(params, callback) {
    if (params === null || Object.keys(params).length === 0) {
      const err = new Error('No params provided');
      if (callback) {
        callback(err);
      }
      return Promise.reject(err);
    }
    return this.call(END_POINTS.GET_INFO, params, '', callback);
  }


  /**
   * The "list-files" service
   * @param {Object} params the hash of the parameters to pass to the request
   * @option params {String} name the immutable name of an existing template
   */
  listFiles(params, callback) {
    if (params === null || Object.keys(params).length === 0) {
      const err = new Error('No params provided');
      if (callback) {
        callback(err);
      }
      return Promise.reject(err);
    }
    return this.call(END_POINTS.LIST_FILES, params, '', callback);
  };


  /**
   * The "schedule-tasks" service
   * @param {Object} params the hash of the parameters to pass to the request
   * @option params {String} name the immutable name of an existing template
   * @param {String} callbackEndpoint an optional callback endpoint, to which a request will be sent whenever there is an update for any of the tasks included in this request. See https://www.sandcage.com/docs/0.2/schedule_tasks#callbacks for an example
   * @param {Function} onsuccess an optional callback to execute when the API call is successfully made
   */
  scheduleFiles(params, callbackEndpoint, onsuccess) {

    if (params === null || Object.keys(params).length === 0) {
      const err = new Error('No params provided');
      if (callback) {
        callback(err);
      }
      return Promise.reject(err);
    }

    if (callbackEndpoint == null) {
      callbackEndpoint = '';
    }
    return this.call(END_POINTS.SCHEDULE_TASKS, params, callbackEndpoint, onsuccess);
  }


  /**
   * The "destroy-files" service
   * @param {Object} params the hash of the parameters to pass to the request
   * @option params {String} name the immutable name of an existing template
   * @param {String} callbackEndpoint an optional callback endpoint, to which a request will be sent whenever there is an update for any of the tasks included in this request. See https://www.sandcage.com/docs/0.2/destroy_files#callbacks for an example
   * @param {Function} onsuccess an optional callback to execute when the API call is successfully made
   */
  destroyFiles(params, callbackEndpoint, onsuccess) {
    if (params === null || Object.keys(params).length === 0) {
      const err = new Error('No params provided');
      if (callback) {
        callback(err);
      }
      return Promise.reject(err);
    }

    if (callbackEndpoint == null) {
      callbackEndpoint = '';
    }
    return this.call(END_POINTS.DESTROY_FILES, params, callbackEndpoint, onsuccess);
  }
}

