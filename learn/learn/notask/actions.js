
const R = require('ramda');
// const pp = require('./pp');
// const S = require('sanctuary');

module.exports = function() {
  const _actionLoadRecords = (records, totalCount) =>
    (value) =>
      R.merge(value, {
        records: records,
        totalCount: totalCount,
      });

  return {
    actionLoadRecords: _actionLoadRecords,
    actionSetPage: R.set(R.lensProp('page')),
  };
};
