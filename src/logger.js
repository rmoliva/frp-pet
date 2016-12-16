
// if (window) {
//   window.console.pp = (json) => console.log(JSON.stringify(json, undefined, 2));
// } else {
  console.pp = (json) => console.log(JSON.stringify(json, undefined, 2));
// }

module.exports = console;
