const test = require('ava');

const flydactionsCreator = require('./flydactions');
const S = require('sanctuary');
// const pp = require('./pp');

const debug = function(tag, message) {
  console.log(`START: ${tag}: ++++++++++++++++++++++++++++++`);
  console.log(message);
  console.log(`END: ${tag}: ++++++++++++++++++++++++++++++`);
};

test('state should be initialState', (t) => {
  let actions = flydactionsCreator();
  let state = actions.state$();

  t.plan(3);

  state.map(function(value) {
    t.is(value.page, 1);
    t.is(value.records.length, 0);
    t.is(value.totalCount, 0);
  });
});

test('actionSetPage page should be setted', (t) => {
  let actions = flydactionsCreator();
  let newPage = 5;

  t.plan(1);

  actions.action$(actions.actions.actionSetPage(newPage));
  let state = actions.state$();

  state.fork(console.error, function(newState) {
    newState.map(function(value) {
      t.is(value.page, newPage);
    });
  });
});

test('actionLoadRecords should be setted', (t) => {
  let actions = flydactionsCreator();

  actions.action$(actions.actions.actionLoadRecords());
  let state = actions.state$();

  t.plan(2);

  state.fork(console.error, function(newState) {
    newState.map(function(value) {
      t.is(value.page, 1);
      t.is(value.totalCount, 30);
    });
  });
});

test('actionSetPage and actionLoadRecords should be setted', (t) => {
  let actions = flydactionsCreator();
  let newPage = 5;

  actions.action$(actions.actions.actionSetPage(newPage));
  actions.action$(actions.actions.actionLoadRecords());
  let state = actions.state$();

  t.plan(3);

  state.fork(console.error, function(newState) {
    newState.fork(console.error, function(newState) {
      debug('newState', newState);

      newState.map(function(value) {
        t.is(value.page, newPage);
        t.is(value.totalCount, 30);
      });
    });
  });
});

//
// test('actionLoadRecords and actionSetPage should be setted', (t) => {
//   const actions = actionsCreator();
//   let newPage = 5;
//   let state = S.Maybe.of({
//     page: 1,
//     totalCount: 0,
//     records: [],
//   });
//   const actionLoadRecords = actions.actionLoadRecords(state);
//
//   t.plan(2);
//
//   actionLoadRecords().fork(console.error, function(newState) {
//     const actionSetPage = actions.actionSetPage(newState);
//     actionSetPage(newPage).fork(console.error, function(newState) {
//       newState.map(function(value) {
//         t.is(value.page, newPage);
//         t.is(value.totalCount, 30);
//       });
//     });
//   });
// });
