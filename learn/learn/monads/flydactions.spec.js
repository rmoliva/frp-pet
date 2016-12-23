const test = require('ava');

const flydactionsCreator = require('./flydactions');
const S = require('sanctuary');
const testData = require('./test_data');
// const pp = require('./pp');

const debug = function(tag, message) {
  console.log(`START: ${tag}: ++++++++++++++++++++++++++++++`);
  console.log(message);
  console.log(`END: ${tag}: ++++++++++++++++++++++++++++++`);
};

// test('state should be initialState', (t) => {
//   let actions = flydactionsCreator();
//   let state = actions.state$();
//
//   t.plan(3);
//
//   state.map(function(value) {
//     t.is(value.page, 1);
//     t.is(value.records.length, 0);
//     t.is(value.totalCount, 0);
//   });
// });
//
// test('actionSetPage page should be setted', (t) => {
//   let actions = flydactionsCreator();
//   let newPage = 5;
//
//   t.plan(1);
//
//   actions.action$(actions.actions.actionSetPage(newPage));
//   let state = actions.state$();
//
//   state.map(function(value) {
//     t.is(value.page, newPage);
//   });
// });

test('actionLoadRecords should be setted', (t) => {
  let actions = flydactionsCreator();
  const serverData = testData(30);

  actions.action$(actions.actions.actionLoadRecords(serverData));
  let state = actions.state$();

  t.plan(2);

  state.map(function(value) {
    t.is(value.page, 1);
    t.is(value.totalCount, 30);
  });
});

test('actionLoadRecords shouldnt be setted with nothing', (t) => {
  let actions = flydactionsCreator();
  actions.action$(actions.actions.actionLoadRecords(S.Left('Something wrong has happened')));
  let state = actions.state$();

  t.plan(2);

  state.map(function(value) {
    t.is(value.page, 1);
    t.is(value.totalCount, 0);
  });
});
//
// test('actionSetPage and actionLoadRecords should be setted', (t) => {
//   let serverData = testData(30);
//   let actions = flydactionsCreator();
//   let newPage = 5;
//
//   actions.action$(actions.actions.actionSetPage(newPage));
//   actions.action$(actions.actions.actionLoadRecords(serverData));
//   let state = actions.state$();
//
//   t.plan(2);
//
//   state.map(function(value) {
//     t.is(value.page, newPage);
//     t.is(value.totalCount, 30);
//   });
// });
//
// test('actionLoadRecords and actionSetPage should be setted', (t) => {
//   let serverData = testData(30);
//   let actions = flydactionsCreator();
//   let newPage = 5;
//
//   actions.action$(actions.actions.actionLoadRecords(serverData));
//   actions.action$(actions.actions.actionSetPage(newPage));
//   let state = actions.state$();
//
//   t.plan(2);
//
//   state.map(function(value) {
//     t.is(value.page, newPage);
//     t.is(value.totalCount, 30);
//   });
// });
