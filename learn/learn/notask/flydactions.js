
const flyd = require('flyd');
const R = require('ramda');
const S = require('sanctuary');
const type = require('union-type');

const actionsCreator = require('./actions');

const debug = function(tag, message) {
  console.log(`START: ${tag}: ----------------------------`);
  console.log(message);
  console.log(`END: ${tag}: ----------------------------`);
};

module.exports = function() {
  const creator = actionsCreator();
  const config = {
    initialState: S.Maybe.of({
      records: [],
      totalCount: 0,
      page: 1,
    }),
    actionTypes: {
      actionLoadRecords: [Array, Number],
      actionSetPage: [Number],
    },
    actionCase: function(state) {
      return {
        actionLoadRecords: (records, totalCount) => state.map(creator.actionLoadRecords(records, totalCount)),
        actionSetPage: (page) => state.map(creator.actionSetPage(page)),
      };
    },
  };

  const action$ = flyd.stream();
  const init = R.always(config.initialState);
  const actions = type(config.actionTypes);

  const actionFn = (state, action) =>
    actions.case(config.actionCase(state), action);

  const state$ = flyd.scan(actionFn, init(), action$);

  return {
    actions: actions,
    action$: action$,
    state$: state$,
  };
};
