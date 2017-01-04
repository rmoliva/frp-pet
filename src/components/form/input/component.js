/**
 * @namespace components/form
 */
'use strict';

const R = require('ramda');
const view = require('./view');

const initialState = {
  type: 'input',
  disabled: false, // *
  error: false, // *
  fluid: false, // *
  icon: '', // *
  label: '', // *
  loading: false, // *
  name: '',
  placeholder: '', // *
  readonly: false, // *
  required: false, // *
  value: '', // *
  inputtype: 'text', // *
  transparent: false,
  visible: true, // *
  wide: 0, // *
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
 * @property {function} setInputType(Maybe) - Sets the type of the input field.
 * @property {function} setLabel(Maybe) - Sets the text of the label of the input field.
 * @property {function} setName(String) - Sets the text of the name of the input field.
 * @property {function} setPlaceholder (Maybe) - Sets the text of the placeholder of the input field.
 * @property {function} setRequired(Boolean) - Sets input field to be required.
 * @property {function} setLoading(Boolean) - Sets the loading state of the input field.
 * @property {function} setReadOnly(Boolean) - Sets input field to be readonly.
 * @property {function} setValue(Maybe) - Sets the value of the input field.
 * @property {function} setTransparent(Boolean) - Sets the transparent state of the input field.
 * @property {function} setWide(Number) - Sets the width of the input field.
 */
const actionTypes = {
  setDisabled: [Boolean],
  setVisible: [Boolean],
  setError: [Boolean],
  setFluid: [Boolean],
  setIcon: [isMaybe],
  setInputType: [isMaybe],
  setLabel: [isMaybe],
  setLoading: [Boolean],
  setName: [String],
  setPlaceholder: [isMaybe],
  setValue: [isMaybe],
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
      // setInputType:: (Maybe) => state
      setInputType: (inputtype) => R.merge(state, {inputtype: inputtype.orSome('text')}),
      // setLabel:: (Maybe) => state
      setLabel: (label) => R.merge(state, {label: label.orSome('')}),
      // setLoading:: (boolean) => state
      setLoading: (loading) => R.merge(state, {loading: loading}),
      // setName:: (string) => state
      setName: (name) => R.merge(state, {name: name}),
      // setPlaceholder:: (Maybe) => state
      setPlaceholder: (placeholder) => R.merge(state, {placeholder: placeholder.orSome('')}),
      // setReadOnly:: (boolean) => state
      setReadOnly: (readonly) => R.merge(state, {readonly: readonly}),
      // setRequired:: (boolean) => state
      setRequired: (required) => R.merge(state, {required: required}),
      // setValue:: (Maybe) => state
      setValue: (value) => R.merge(state, {value: value.orSome('')}),
      // setTransparent:: (boolean) => state
      setTransparent: (transparent) =>
        R.merge(state, {transparent: transparent}),
      // setWide:: (Maybe) => state
      setWide: (wide) => R.merge(state, {wide: wide.orSome(0)}),
    };
  },

  viewFn: view,
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
 * @param {String} config.inputtype - Type of the input
 * @param {Boolean} config.loading - Initial loading state
 * @param {String} config.name - Initial name state
 * @param {String} config.placeholder - Initial placeholder text
 * @param {String} config.value - Initial input value
 * @return {Component} The component object
 */
module.exports = formInputComponent;
