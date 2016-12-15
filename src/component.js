'use strict';

require('babel-polyfill');
const flyd = require('flyd');
const R = require('ramda');
const type = require('union-type');

module.exports = function() {
  const action$ = flyd.stream();
  const initialState = {
    records: [],
    total: 0,
    page: 1,
  };
  const init = R.always(initialState);

  const actions = type({
    setRecords: [Array, Number],
  });

  const actionFn = function(action, state) {
    return actions.case({
      setRecords: function(records, total) {
        return R.merge(state, {records: records, total: total});
      },
    }, action);
  };

  const state$ = flyd.scan(R.flip(actionFn), init(), action$);

  return {
    actions: actions,
    action$: action$,
    state$: state$,
  };
};
