'use strict';

const flyd = require('flyd');
const R = require('ramda');
const type = require('union-type');
const ds = require('../ds');

/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} Component
 * @property {Object} actions - Object containing all the actions of the component.
 * @property {Stream} action$ - Stream where to put the actions.
 * @property {Stream} state$ - Stream where the component notifies its state.
 */
module.exports = function(options) {
  return function(config) {
    const action$ = flyd.stream();
    const init = R.always(R.merge(options.initialState, config));

    const actions = type(options.actionTypes);

    const actionFn = (action, state) =>
      action.case(options.actionCase(state));

    const state$ = flyd.scan(R.flip(actionFn), init(), action$);

    // ds('actions', action$);

    return {
      actions: actions,
      action$: action$,
      state$: state$,
    };
  };
};
