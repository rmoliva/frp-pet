'use strict';

const R = require('ramda');
const base = require('./base');

module.exports = base({
  initialState: {
    records: [],
    total: 0,
    page: 1,
  },
  actionTypes: {
    setRecords: [Array, Number],
  },
  actionCase: function(state) {
    return {
      setRecords: function(records, total) {
        return R.merge(state, {records: records, total: total});
      },
    };
  },
});
