'use strict';

const flyd = require('flyd');

const factory = require('./components/factory');
const tab = require('./components/tab/component');
const tabpanel = require('./components/tab/panel/component');

const ds = require('./ds');
const SnabbdomPatch = require('./snabbdom_renderer');

const factoryObject = factory();

let vdom = document.getElementById('application');

factoryObject.register('tab', tab);
factoryObject.register('tabpanel', tabpanel);

let rootNode = factoryObject.instance({
  type: 'tab',
  items: [{
    type: 'tabpanel',
    title: 'Tab 1',
  }, {
    type: 'tabpanel',
    title: 'Tab 2',
  }],
});

// ds('rootNode.view$', rootNode.data.view$);
// ds('rootNode.state$', rootNode.data.state$);
//
// console.log(rootNode);

flyd.on(function(view) {
  vdom = SnabbdomPatch(vdom, view);
}, rootNode.data.view$);

console.log('Launched!!');
// rootNode.data.action$(rootNode.data.actions.setVisible(true));
