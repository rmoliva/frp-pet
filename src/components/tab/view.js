
const h = require('snabbdom/h');
const thunk = require('snabbdom/thunk');
const R = require('ramda');

const tabView = function(options) {
  const _onClickTab = function(tabIndex) {
    options.action$(
      options.actions.setActive(tabIndex)
    );
  };

  const _tabItemThunk = function(active, title, index) {
    return h('a', {
      class: {
        active: active,
        item: true,
      },
      on: {
        click: [
          _onClickTab,
          index,
        ],
      },
    }, title);
  };

  const _tabItemView = function(state) {
    return function(tabData, index) {
      return thunk(
        'a',
        tabData.state$().id,
        _tabItemThunk, [
          (state.active === index),
          tabData.state$().title,
          index,
        ]);
    };
  };

  const _tabItems = function() {
    const state = options.state$();
    const mapIndexed = R.addIndex(R.map);
    return mapIndexed(_tabItemView(state), state.items);
  };

  const _tabContent = function() {
    const state = options.state$();
    const item = state.items[state.active];

    // Pintar el contenido del tab que este activo
    if (item) {
      return item.view$();
    }
    console.log(`No tab defined for active tab: ${state.active}`);
  };

  const _tabComponentView = function() {
    return [
      h('div', {
        class: {
          ui: true,
          top: true,
          attached: true,
          tabular: true,
          menu: true,
        },
      }, _tabItems()),
      h('div', {
        class: {
          ui: true,
          bottom: true,
          attached: true,
          active: true,
          loading: options.state$().loading,
          tab: true,
          segment: true,
        },
      }, [
        _tabContent(),
      ]),
    ];
  };

  return function() {
    let children = [];

    if (options.state$().visible) {
      children = _tabComponentView();
    }

    return h('div', {
      key: options.state$().id,
    }, children);
  };
};

module.exports = tabView;
