
const Snabbdom = require('snabbdom');
const ClassModule = require('snabbdom/modules/class');
const AttrsModule = require('snabbdom/modules/attributes');
const PropsModule = require('snabbdom/modules/props');
const StyleModule = require('snabbdom/modules/style');
const EventListenersModule = require('snabbdom/modules/eventlisteners');

const render = function(oldVNode, vnode) {
  // Init patch function with choosen modules
  const patch = Snabbdom.init([
    ClassModule,
    AttrsModule,
    PropsModule,
    StyleModule,
    EventListenersModule,
  ]);
  return patch(oldVNode, vnode);
};

module.exports = render;
