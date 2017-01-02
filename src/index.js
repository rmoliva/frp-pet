'use strict';

const flyd = require('flyd');

const factory = require('./components/factory');
const tab = require('./components/tab/component');
const tabPanel = require('./components/tab/panel/component');
const form = require('./components/form/component');
const formFields = require('./components/form/fields/component');
const formInput = require('./components/form/input/component');

const ds = require('./ds');
const SnabbdomPatch = require('./snabbdom_renderer');

const factoryObject = factory();

let vdom = document.getElementById('application');

factoryObject.register('tab', tab);
factoryObject.register('tabpanel', tabPanel);
factoryObject.register('form', form);
factoryObject.register('formfields', formFields);
factoryObject.register('forminput', formInput);

let rootNode = factoryObject.instance({
  type: 'tab',
  items: [{
    type: 'tabpanel',
    title: 'Nombre',
    items: [{
      type: 'form',
      items: [{
        type: 'formfields',
        items: [{
          type: 'forminput',
          label: 'Nombre',
          placeholder: 'Introduzca nombre',
          loading: true,
          required: true,
          icon: 'thumbs up',
          transparent: true,
        }, {
          type: 'forminput',
          label: 'Apellidos',
          placeholder: 'Introduzca apellidos',
          disabled: true,
          required: true,
          icon: 'thumbs up',
          transparent: true,
        }],
      }],
    }],
  }, {
    type: 'tabpanel',
    title: 'Cuenta',
    items: [{
      type: 'form',
      items: [{
        type: 'formfields',
        items: [{
          type: 'forminput',
          label: 'Cuenta',
          placeholder: 'Introduzca cuenta',
          error: true,
        }, {
          type: 'forminput',
          label: 'Contraseña',
          placeholder: 'Introduzca contraseña',
          inputtype: 'password',
        }, {
          type: 'forminput',
          label: 'Repetir Contraseña',
          placeholder: 'Introduzca repetición de contraseña',
          inputtype: 'password',
        }],
      }],
    }],
  }, {
    type: 'tabpanel',
    title: 'Dirección',
    items: [{
      type: 'form',
      items: [{
        type: 'formfields',
        items: [{
          type: 'forminput',
          label: 'Calle',
          placeholder: 'Introduzca calle',
          wide: 10,
        }, {
          type: 'forminput',
          label: 'Población',
          placeholder: 'Introduzca población',
          wide: 3,
        }, {
          type: 'forminput',
          label: 'Ciudad',
          placeholder: 'Read Only',
          readonly: true,
          wide: 3,
        }],
      }, {
        type: 'formfields',
        items: [{
          type: 'forminput',
          label: 'Calle 2',
          placeholder: 'Introduzca calle 2',
          wide: 6,
          fluid: true,
        }, {
          type: 'forminput',
          label: 'Población 3',
          placeholder: 'Introduzca población 3',
          wide: 6,
          inline: true,
        }, {
          type: 'forminput',
          label: 'Ciudad 4',
          placeholder: 'Read Only 4',
          readonly: true,
          wide: 4,
        }],
      }],
    }],
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
