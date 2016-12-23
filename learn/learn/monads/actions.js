
const R = require('ramda');
const M = require('monet');
const pp = require('../pp');
// const S = require('sanctuary');

module.exports = function() {
  const _setError = (state) => (error) => R.merge(state, {error: error});

  // state => Either (serverData) => state
  const _actionLoadRecords = function(state) {
    return function(serverDataMB) {
      return serverDataMB.cata(
        _setError(state),
        function(data) {
          let [records, totalCount] = R.props(
            ['records', 'totalCount'], data
          );
          return R.merge(state, {
            records: records,
            totalCount: totalCount,
          });
        }
      );
    };
  };

  // state => number page => state
  const _actionSetPage = function(state) {
    return function(page) {
      return R.set(R.lensProp('page'), page, state);
    };
  };

  return {
    actionLoadRecords: _actionLoadRecords,
    actionSetPage: _actionSetPage,
  };
};
