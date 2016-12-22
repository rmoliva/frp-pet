const R = require('ramda');

module.exports = function(total) {
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
