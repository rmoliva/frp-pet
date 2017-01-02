/**
 * @namespace components/form
 */
'use strict';

const R = require('ramda');

const initialState = {
  type: 'tabpanel',
  visible: true,
  title: '',
};

// TODO
const isMaybe = R.T;

/**
 * Default options for SuperWidget instances. Changing these options affects all
 * SuperWidget instances.
 * @type {Object}
 * @memberof components/form.Field
 * @property {function} setVisible(Boolean) - Sets the visible state of the tab.
 * @property {function} setTitle(Maybe) - Sets the tab title.
 */
const actionTypes = {
  setTitle: [isMaybe],
  setVisible: [Boolean],
};

const tabPanelComponent = {
  initialState: initialState,

  actionTypes: actionTypes,

  actionCase: function(state) {
    return {
      // setVisible:: (boolean) => state
      setVisible: (visible) => R.merge(state, {visible: visible}),
      // setTitle:: (Maybe) => state
      setTitle: (title) => R.merge(state, {title: title.orSome('')}),
    };
  },
};

/**
 * The Input Form Component
 * @class Field
 * @memberof components/form
 * @param {Object} config - Initial component configuration
 * @param {Boolean} config.visible - Initial visible state
 * @param {Maybe} config.title - Initial title value
 * @return {Component} The component object
 */
module.exports = tabPanelComponent;
