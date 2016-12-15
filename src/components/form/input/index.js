'use strict';

const R = require('ramda');
const baseComponent = require('../../base');

const initialState = {
  text: '',
  loading: false,
  disabled: false,
  error: false,
  icon: '',
  fluid: false,
  transparent: false,
  size: '',
};

module.exports = function(config) {
  return baseComponent({
    initialState: initialState,
    actionTypes: {
      setText: [String],
      setIcon: [String],
      setSize: [String],
      setLoading: [Boolean],
      setDisabled: [Boolean],
      setError: [Boolean],
      setFluid: [Boolean],
      setTransparent: [Boolean],
    },
    actionCase: function(state) {
      return {
        setText: (text) => R.merge(state, {text: text}),
        setIcon: (icon) => R.merge(state, {icon: icon}),
        setSize: (size) => R.merge(state, {size: size}),
        setLoading: (loading) => R.merge(state, {loading: loading}),
        setDisabled: (disabled) => R.merge(state, {disabled: disabled}),
        setError: (error) => R.merge(state, {error: error}),
        setFluid: (fluid) => R.merge(state, {fluid: fluid}),
        setTransparent: (transparent) =>
          R.merge(state, {transparent: transparent}),
      };
    },
  });
};
