
const flyd = require('flyd');

module.exports = function(name, stream) {
  flyd.on(function(response) {
    console.log(`S: ${name} -----------------------------------------`);
    console.log(response);
    console.log(`E: ${name} -----------------------------------------`);
  }, stream);
};
