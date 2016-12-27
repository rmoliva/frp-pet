'use strict';

const flyd = require('flyd');
const R = require('ramda');
const type = require('union-type');
const uuidV4 = require('uuid/v4');
const ds = require('../ds');

/**
 * This is the Component constructor.
 * @typedef {Object} Component
 * @property {Object} actions - Object containing all the actions of the component.
 * @property {Stream} action$ - Stream where to put the actions.
 * @property {Stream} state$ - Stream where the component notifies its state.
 */
module.exports = function(options) {
  const _setID = function(config) {
    // Si hay un ID establecido no tocarlo
    if (config && config.id) {
      return config;
    }

    // Si no hay ID generar uno propio
    return R.merge(config, {id: uuidV4()});
  };

  return function(config) {
    const action$ = flyd.stream();
    const init = R.always(R.merge(options.initialState, _setID(config)));
    const initialState = init();

    const actions = type(options.actionTypes);

    const actionFn = (action, state) =>
      action.case(options.actionCase(state));

    const state$ = flyd.scan(R.flip(actionFn), initialState, action$);

    // ds('actions', action$);

    return {
      id: initialState.id,
      actions: actions,
      action$: action$,
      state$: state$,
    };
  };
};
