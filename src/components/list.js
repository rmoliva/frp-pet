'use strict';

const M = require('folktale');
const R = require('ramda');
const baseComponent = require('./base');

const testRecords = [{
  id: 1,
  name: 'Uno',
}, {
  id: 2,
  name: 'Dos',
}];

const fetchRecords = () => M.IO(() => testRecords);

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
        loadRecords: fetchRecords().map((records) => R.merge(state, {records: records})),
      };
    },
  });
};
