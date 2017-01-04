
const flyd = require('flyd');

module.exports = function(name, stream) {
  flyd.on(function(response) {
    if (console.group) {
      console.group(name);
    } else {
      console.log(`S: ${name} -----------------------------------------`);
    }
    console.log(response);
    if (console.groupEnd) {
      console.groupEnd();
    } else {
      console.log(`E: ${name} -----------------------------------------`);
    }
  }, stream);
};
