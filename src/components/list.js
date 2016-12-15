'use strict';

const S = require('sanctuary');
const R = require('ramda');
require('fluture');
const baseComponent = require('./base');

const testRecords = [{
  id: 1,
  name: 'Uno'
}, {
  id: 2,
  name: 'Dos'
}];

const fetchRecords = () => {} // Future((rej, res) => res(testRecords));

const initialState = {
  records: [],
};

module.exports = function(config) {
  return baseComponent({
    initialState: initialState,
    actionTypes: {
      loadRecords: [],
    },
    actionCase: function(state) {
      return {
        loadRecords: () => {} // fetchRecords(),
      };
    },
  });
};
