
const flyd = require('flyd');
const R = require('ramda');
const S = require('sanctuary');
const type = require('union-type');

const actionsCreator = require('./actions');

module.exports = function() {
  const isMaybe = R.T;
  const creator = actionsCreator();
  const config = {
    initialState: S.Maybe.of({
      records: [],
      totalCount: 0,
      page: 1,
    }),
    actionTypes: {
      actionLoadRecords: [isMaybe],
      actionSetPage: [Number],
    },
    actionCase: function(state) {
      return {
        actionLoadRecords: (serverData) => creator.actionLoadRecords(state, serverData),
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
