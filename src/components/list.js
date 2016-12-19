'use strict';

const logger = require('../logger');
const Task = require('data.task'); // Folktale data.task
const S = require('sanctuary');
const R = require('ramda');
const baseComponent = require('./base');

const testData = {
  success: true,
  total: 2,
  records: [{
    id: 1,
    name: 'Uno',
  }, {
    id: 2,
    name: 'Dos',
  }],
};

const fetchRecords = function() {
  return new Task(function(reject, response) {
    if (testData.success) {
      response(testData);
    } else {
      reject(testData);
    }
  });
};

const initialState = S.Maybe.of({
  records: [],
  page: 1,
  total: 0,
});

const actionLoadRecords = function(type_state) {
  return function() {
    return type_state.chain(function(state) {
      return fetchRecords().map(function(server_data) {
        return R.merge(state, {records: server_data.records, total: server_data.total});
      });
    });
  };
};

// .fork(
//   (err) => console.log('ERROR: ' + err),
//   console.log
// );

const actionSetPage = function(type_state) {
  return function(page) {
    return type_state.chain(function(state) {
      return new Task(function(reject, response) {
        response(R.set(R.lensProp('page'), page, state));
      });
    });
  };
};

module.exports = function(config) {
  return baseComponent({
    initialState: initialState,
    actionTypes: {
      loadRecords: [],
      setPage: [Number],
    },
    actionCase: function(state) {
      return {
        loadRecords: actionLoadRecords(state),
        setPage: actionSetPage(state),
      };
    },
  });
};
