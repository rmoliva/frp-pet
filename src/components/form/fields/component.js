/**
 * @namespace components/form
 */
'use strict';

const R = require('ramda');
const view = require('./view');

const initialState = {
  type: 'fields',
  visible: true,
};

/**
 * Default options for SuperWidget instances. Changing these options affects all
 * SuperWidget instances.
 * @type {Object}
 * @memberof components/form.Field
 * @property {function} setVisible(Boolean) - Sets the visible state of the tab.
 * @property {function} setActive(Number) - Sets the active tab.
 */
const actionTypes = {
  setVisible: [Boolean],
};

const fieldsComponent = {
  initialState: initialState,

  actionTypes: actionTypes,

  actionCase: function(state) {
    return {
      // setVisible:: (boolean) => state
      setVisible: (visible) => R.merge(state, {visible: visible}),
    };
  },

  viewFn: view,
};

/**
 * The Input Form Component
 * @class Field
 * @memberof components/field
 * @param {Object} config - Initial component configuration
 * @param {Boolean} config.visible - Initial visible state
 * @return {Component} The component object
 */
module.exports = fieldsComponent;
