
const R = require('ramda');
const Task = require('data.task'); // Folktale data.task
// const pp = require('./pp');
// const S = require('sanctuary');

const testData = function(total) {
  let records = R.map(function(value) {
    return {
      id: value,
      name: `Item${value}`,
    };
  }, R.times(R.identity, total));

  return {
    success: true,
    records: records,
    totalCount: total,
  };
};

const _setPage = function(state, page) {
  return state.map(function(value) {
    return R.merge(value, {
      page: page,
    });
  });
};

const _setServerData = function(state, serverData) {
  return function(serverData) {
    return state.map(function(value) {
      return R.merge(value, {
        records: serverData.records,
        totalCount: serverData.totalCount,
      });
    });
  };
};

module.exports = function() {
  const _actionLoadRecords = function(state) {
    return function() {
      return new Task(function(reject, resolve) {
        resolve(testData(30));
      }).map(_setServerData(state));
    };
  };

  const _actionSetPage = function(state) {
    return function(page) {
      return new Task(function(reject, resolve) {
        resolve(_setPage(state, page));
      });
    };
  };

  return {
    actionLoadRecords: _actionLoadRecords,
    actionSetPage: _actionSetPage,
  };
};
