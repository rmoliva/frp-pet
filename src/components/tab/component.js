/**
 * @namespace components/form
 */
'use strict';

const R = require('ramda');
const view = require('./view');

const initialState = {
  type: 'tab',
  visible: true,
  loading: false,
  active: 0, // Indice del hijo que este activo
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
  setLoading: [Boolean],
  setActive: [Number],
};

const tabComponent = {
  initialState: initialState,

  actionTypes: actionTypes,

  actionCase: function(state) {
    return {
      // setLoading:: (boolean) => state
      setLoading: (loading) => R.merge(state, {loading: loading}),
      // setVisible:: (boolean) => state
      setVisible: (visible) => R.merge(state, {visible: visible}),
      // setActive:: (number) => state
      setActive: (active) => R.merge(state, {active: active}),
    };
  },

  viewFn: view,
};

/**
 * The Input Form Component
 * @class Field
 * @memberof components/form
 * @param {Object} config - Initial component configuration
 * @param {Boolean} config.loading - Initial loading state
 * @param {Boolean} config.visible - Initial visible state
 * @param {Number} config.active - Initial active tab
 * @return {Component} The component object
 */
module.exports = tabComponent;
