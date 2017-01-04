/**
 * @namespace components
 */
'use strict';

const R = require('ramda');
const view = require('./view');

const initialState = {
  type: 'form',
  visible: true,
  loading: false,
  valid: false,
  validations: {},
};

/**
 * Default options for SuperWidget instances. Changing these options affects all
 * SuperWidget instances.
 * @type {Object}
 * @memberof components/form
 * @property {function} setVisible(Boolean) - Sets the visible state of the form.
 * @property {function} setLoading(Boolean) - Sets the loading state of the form.
 * @property {function} setValid(Boolean) - Sets the valid state of the form.
 * @property {function} setActive(Number) - Sets the active form.
 */
const actionTypes = {
  setVisible: [Boolean],
  setLoading: [Boolean],
};

const _findChildNodeByName = function(itemData, name) {
  if (itemData.state$().name === name) {
    return itemData;
  }

  // Buscar entre los hijos del item pasado
  return R.find(function(childItemData) {
    let foundItem = _findChildNodeByName(childItemData, name);
    if (foundItem) {
      return foundItem;
    }
  }, itemData.state$().items);
};

const formComponent = {
  initialState: initialState,

  actionTypes: actionTypes,

  actionCase: function(state) {
    return {
      // setVisible:: (boolean) => state
      setVisible: (visible) => R.merge(state, {visible: visible}),
      // setLoading:: (boolean) => state
      setLoading: (loading) => R.merge(state, {loading: loading}),
      // setValid:: (boolean) => state
      setValid: (valid) => R.merge(state, {valid: valid}),
    };
  },

  viewFn: view,

  initialize: function(options) {
    let childStates = [];

    // Para cada clave de validacion busco entre los hijos aquellos
    // Que tengan como nombre el de la validacion
    R.forEach(function(name) {
      R.forEach(function(itemData) {
        let itemFound = _findChildNodeByName(itemData, name);
        if (itemFound) {
          childStates.push(itemFound);
        }
      }, options.initialState.items);
    }, R.keys(options.initialState.validations));

    console.log(childStates);

  },
};

/**
 * The Form Component
 * @class Form
 * @memberof components/form
 * @param {Object} config - Initial component configuration
 * @param {Boolean} config.visible - Initial visible state
 * @param {Boolean} config.loading - Initial loading state
 * @return {Component} The component object
 */
module.exports = formComponent;
