
const h = require('snabbdom/h');
const R = require('ramda');
// const thunk = require('snabbdom/thunk');
const iconsToClass = require('../../icons_to_class');

// <div class="field error">
//   <label>First Name</label>
//   <input placeholder="First Name" type="text">
// </div>

const _input = function(placeholder, inputtype, value, readonly) {
  let props = {
    placeholder: placeholder,
    type: inputtype,
    value: value,
  };
  let attrs = {};

  if (readonly) {
    attrs = R.merge(attrs, {readonly: 'readonly'});
  }

  return h('input', {
    props: props,
    attrs: attrs,
  }, [
    value,
  ]);
};

const _icon = function(icon) {
  return h('i', {
    class: iconsToClass(icon),
  });
};

const _inputRender = function(placeholder, inputtype, value, icon, loading, disabled, readonly, fluid, transparent) {
  let finalIcon = icon;
  if (loading) {
    finalIcon = 'loading';
  }
  let children = [
    _input(placeholder, inputtype, value, readonly),
  ];

  if (finalIcon) {
    children.push(_icon(finalIcon));
  }

  return h('div', {
    class: {
      ui: true,
      icon: true,
      input: true,
      transparent: transparent,
      fluid: fluid,
      loading: loading,
      disabled: disabled,
    },
  }, children);
};

const _wideToNumber = function(wide) {
  const numbers = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourtee',
    15: 'fifteen',
    16: 'sixteen',
  };
  return numbers[wide];
};

const _fieldRender = function(id, error, required, label, placeholder, inputtype, value, icon, loading, disabled, readonly, wide, fluid, transparent) {
  let klass = {
    field: true,
    error: error,
    required: required,
  };
  let wideNumber = _wideToNumber(wide);

  if (wideNumber) {
    klass[wideNumber] = true;
    klass.wide = true;
  }

  return h('div', {
    key: id,
    class: klass,
  }, [
    h('label', {}, [label]),
    _inputRender(placeholder, inputtype, value, icon, loading, disabled, readonly, fluid, transparent),
  ]);
};

const inputView = function(options) {
  return function() {
    let state = options.state$();
    if (!state.visible) {
      return h('div', {
        key: state.id,
      });
    }

    return _fieldRender(
      state.id,
      state.error,
      state.required,
      state.label,
      state.placeholder,
      state.inputtype,
      state.text,
      state.icon,
      state.loading,
      state.disabled,
      state.readonly,
      state.wide,
      state.fluid,
      state.transparent
    );
  };
};

module.exports = inputView;
