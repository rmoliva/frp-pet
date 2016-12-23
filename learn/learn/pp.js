module.exports = function(tag, message) {
  console.log(`START: ${tag}: ----------------------------`);
  console.log(message);
  console.log(`END: ${tag}: ----------------------------`);
};


// module.exports = (json) => console.log(JSON.stringify(json, undefined, 2));
