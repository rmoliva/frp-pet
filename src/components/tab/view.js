
const h = require('snabbdom/h');

const tabView = function(options) {
  return function() {
    return h('div', {}, [
      h('div', {
        class: {
          ui: true,
          top: true,
          attached: true,
          tabular: true,
          menu: true,
        },
      }),
      h('div', {
        class: {
          ui: true,
          bottom: true,
          attached: true,
          loading: true,
          tab: true,
          segment: true,
        },
      }),
    ]);
  };
};

module.exports = tabView;
