
const h = require('snabbdom/h');
// const thunk = require('snabbdom/thunk');
const R = require('ramda');

const tabPanelView = function(options) {
  return function() {
    let children = R.map(function(itemData) {
      return itemData.view$();
    }, options.state$().items);

    return h('div', {
      key: options.state$().id,
    }, children);
  };
};

module.exports = tabPanelView;
