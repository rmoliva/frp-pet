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
};

/**
 * Default options for SuperWidget instances. Changing these options affects all
 * SuperWidget instances.
 * @type {Object}
 * @memberof components/form
 * @property {function} setVisible(Boolean) - Sets the visible state of the form.
 * @property {function} setLoading(Boolean) - Sets the loading state of the form.
 * @property {function} setActive(Number) - Sets the active form.
 */
const actionTypes = {
  setVisible: [Boolean],
  setLoading: [Boolean],
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
    };
  },

  viewFn: view,
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
