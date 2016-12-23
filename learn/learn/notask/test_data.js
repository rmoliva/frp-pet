const R = require('ramda');
const S = require('sanctuary');

module.exports = function(total) {
  let records = R.map(function(value) {
    return {
      id: value,
      name: `Item${value}`,
    };
  }, R.times(R.identity, total));

  return S.Maybe.of({
    success: true,
    records: records,
    totalCount: total,
  });
};
