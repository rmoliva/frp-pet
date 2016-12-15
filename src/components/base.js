'use strict';

const flyd = require('flyd');
const R = require('ramda');
const type = require('union-type');

module.exports = function(options) {
  const action$ = flyd.stream();
  const init = R.always(options.initialState);

  const actions = type(options.actionTypes);

  const actionFn = (action, state) =>
    actions.case(options.actionCase(state), action);

  const state$ = flyd.scan(R.flip(actionFn), init(), action$);

  return {
    actions: actions,
    action$: action$,
    state$: state$,
  };
};
