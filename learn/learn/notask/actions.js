
const R = require('ramda');
const S = require('sanctuary');
const pp = require('../pp');
// const S = require('sanctuary');

module.exports = function() {
  const _actionLoadRecords = function(state, serverDataMB) {
    return state.map(function(value) {
      serverDataMB.map(
        R.props(['records', 'totalCount'])
      ).map(function([records, totalCount]) {
        value = R.merge(value, {
          records: records,
          totalCount: totalCount,
        });
      });
      return value;
    });
  };

  return {
    actionLoadRecords: _actionLoadRecords,
    actionSetPage: R.set(R.lensProp('page')),
  };
};
