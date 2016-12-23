const R = require('ramda');
const M = require('monet');

// getTestData :: (number total, boolean error) => Maybe<serverData>
module.exports = function(total, error) {
  let records;

  // Si hay error, retornar Left
  if (error) {
    return M.Left(error);
  }

  // Si todo va bien retornar los datos
  records = R.map(function(value) {
    return {
      id: value,
      name: `Item${value}`,
    };
  }, R.times(R.identity, total));

  return M.Right({
    records: records,
    totalCount: total,
  });
};
