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
      id: 'form-name',
      type: 'form',
      validations: {
        name: {
          required: true,
        },
        surname: {
          required: true,
        },
      },
      items: [{
        type: 'formfields',
        items: [{
          id: 'field-name',
          type: 'forminput',
          label: 'Nombre',
          name: 'name',
          placeholder: 'Introduzca nombre',
          loading: true,
          required: true,
          icon: 'thumbs up',
          transparent: true,
        }, {
          id: 'field-surname',
          type: 'forminput',
          label: 'Apellidos',
          name: 'surname',
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
          name: 'login',
          placeholder: 'Introduzca cuenta',
          error: true,
        }, {
          type: 'forminput',
          label: 'Contraseña',
          name: 'password',
          placeholder: 'Introduzca contraseña',
          inputtype: 'password',
        }, {
          type: 'forminput',
          label: 'Repetir Contraseña',
          name: 'password_confirmation',
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
          name: 'street',
          label: 'Calle',
          placeholder: 'Introduzca calle',
          wide: 10,
        }, {
          type: 'forminput',
          name: 'state',
          label: 'Localidad',
          placeholder: 'Introduzca localidad',
          wide: 6,
        }],
      }, {
        type: 'formfields',
        items: [{
          type: 'forminput',
          label: 'Ciudad',
          name: 'city',
          placeholder: 'Introduzca ciudad',
          wide: 16,
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
