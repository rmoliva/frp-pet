
const h = require('snabbdom/h');
// const thunk = require('snabbdom/thunk');
const R = require('ramda');

const fieldsView = function(options) {
  return function() {
    let children = R.map(function(itemData) {
      return itemData.view$();
    }, options.state$().items);

    return h('div', {
      key: options.state$().id,
      class: {
        ui: true,
        fields: true,
        // inline: true, // TODO: Configurable
      },
    }, children);
  };
};

module.exports = fieldsView;
