/**
 * @namespace components/form
 */
'use strict';

const R = require('ramda');

const initialState = {
  type: 'input',
  visible: true,
  disabled: false,
  error: false,
  fluid: false,
  icon: '',
  inline: false,
  label: '',
  loading: false,
  readonly: false,
  required: false,
  size: '',
  text: '',
  transparent: false,
  wide: 0,
};

// TODO
const isMaybe = R.T;

/**
 * Default options for SuperWidget instances. Changing these options affects all
 * SuperWidget instances.
 * @type {Object}
 * @memberof components/form.Field
 * @property {function} setDisabled(Boolean) - Sets the disabled state of the input field.
 * @property {function} setVisible(Boolean) - Sets the visible state of the input field.
 * @property {function} setError(Boolean) - Sets the error state of the input field.
 * @property {function} setFluid(Boolean) - Sets the fluid state of the input field.
 * @property {function} setIcon(Maybe) - Sets the icon class of the input field.
 * @property {function} setInline(Boolean) - Sets the inline class of the input field.
 * @property {function} setLabel(Maybe) - Sets the text of the label of the input field.
 * @property {function} setRequired(Boolean) - Sets input field to be required.
 * @property {function} setLoading(Boolean) - Sets the loading state of the input field.
 * @property {function} setReadOnly(Boolean) - Sets input field to be readonly.
 * @property {function} setSize(Maybe) - Sets the class size of the input field.
 * @property {function} setText(Maybe) - Sets the text of the input field.
 * @property {function} setTransparent(Boolean) - Sets the transparent state of the input field.
 * @property {function} setWide(Number) - Sets the width of the input field.
 */
const actionTypes = {
  setDisabled: [Boolean],
  setVisible: [Boolean],
  setError: [Boolean],
  setFluid: [Boolean],
  setIcon: [isMaybe],
  setInline: [Boolean],
  setLabel: [isMaybe],
  setLoading: [Boolean],
  setSize: [isMaybe],
  setText: [isMaybe],
  setReadOnly: [Boolean],
  setRequired: [Boolean],
  setTransparent: [Boolean],
  setWide: [isMaybe],
};

const formInputComponent = {
  initialState: initialState,

  actionTypes: actionTypes,

  actionCase: function(state) {
    return {
      // setDisabled:: (boolean) => state
      setDisabled: (disabled) => R.merge(state, {disabled: disabled}),
      // setVisible:: (boolean) => state
      setVisible: (visible) => R.merge(state, {visible: visible}),
      // setError:: (boolean) => state
      setError: (error) => R.merge(state, {error: error}),
      // setFluid:: (boolean) => state
      setFluid: (fluid) => R.merge(state, {fluid: fluid}),
      // setIcon:: (Maybe) => state
      setIcon: (icon) => R.merge(state, {icon: icon.orSome('')}),
      // setInline:: (boolean) => state
      setInline: (inline) => R.merge(state, {inline: inline}),
      // setLabel:: (Maybe) => state
      setLabel: (label) => R.merge(state, {label: label.orSome('')}),
      // setLoading:: (boolean) => state
      setLoading: (loading) => R.merge(state, {loading: loading}),
      // setReadOnly:: (boolean) => state
      setReadOnly: (readonly) => R.merge(state, {readonly: readonly}),
      // setRequired:: (boolean) => state
      setRequired: (required) => R.merge(state, {required: required}),
      // setSize:: (Maybe) => state
      setSize: (size) => R.merge(state, {size: size.orSome('')}),
      // setText:: (Maybe) => state
      setText: (text) => R.merge(state, {text: text.orSome('')}),
      // setTransparent:: (boolean) => state
      setTransparent: (transparent) =>
        R.merge(state, {transparent: transparent}),
      // setWide:: (Maybe) => state
      setWide: (wide) => R.merge(state, {wide: wide.orSome(0)}),
    };
  },
};

/**
 * The Input Form Component
 * @class Field
 * @memberof components/form
 * @param {Object} config - Initial component configuration
 * @param {Boolean} config.disabled - Initial disabled state
 * @param {Boolean} config.visible - Initial visible state
 * @param {Boolean} config.error - Initial error state
 * @param {Boolean} config.fluid - Initial fluid state
 * @param {String} config.icon - Icon classes of the input
 * @param {Boolean} config.loading - Initial loading state
 * @param {String} config.size - Size class of the input
 * @param {String} config.text - Initial input text
 * @return {Component} The component object
 */
module.exports = formInputComponent;
