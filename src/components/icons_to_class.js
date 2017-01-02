
const R = require('ramda');

const iconsToClass = function(icon) {
  let keys = icon.split(' ');
  let acc = {icon: true};
  return R.reduce(function(ret, key) {
    ret[key] = true;
    return ret;
  }, acc, keys);
};

module.exports = iconsToClass;
