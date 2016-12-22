const test = require('ava');

const actionsCreator = require('./actions');
const S = require('sanctuary');
const R = require('ramda');
const testData = require('./test_data');
// const pp = require('./pp');

const debug = function(tag, message) {
  console.log(`START: ${tag}: ++++++++++++++++++++++++++++++`);
  console.log(message);
  console.log(`END: ${tag}: ++++++++++++++++++++++++++++++`);
};

test('actionsCreator functions', (t) => {
  const actions = actionsCreator();
  t.plan(2);
  t.true(
    typeof actions.actionLoadRecords === 'function',
    'actionLoadRecords should be a function'
  );
  t.true(
    typeof actions.actionSetPage === 'function',
    'actionSetPage should be a function'
  );
});

test('actionSetPage page should be setted', (t) => {
  const actions = actionsCreator();
  let newPage = 5;
  let state = S.Maybe.of({
    page: 1,
    totalCount: 0,
    records: [],
  });
  const actionSetPage = actions.actionSetPage(state);
  // const actionLoadRecords = actions.actionLoadRecords(state);

  t.plan(1);

  actionSetPage(newPage).map(function(newState) {
    t.is(newState.page, newPage);
  });
});

test('actionLoadRecords should be setted', (t) => {
  const actions = actionsCreator();
  const serverData = testData(30);
  let state = S.Maybe.of({
    page: 1,
    totalCount: 0,
    records: [],
  });
  const actionLoadRecords = actions.actionLoadRecords(state);

  t.plan(2);

  actionLoadRecords(
    serverData.records,
    serverData.totalCount
  ).map(function(newState) {
    t.is(newState.page, 1);
    t.is(newState.totalCount, 30);
  });
});

test('actionSetPage and actionLoadRecords should be setted', (t) => {
  const actions = actionsCreator();
  const serverData = testData(30);

  let newPage = 5;
  let state = S.Maybe.of({
    page: 1,
    totalCount: 0,
    records: [],
  });
  const actionSetPage = actions.actionSetPage(state);
  let newState = actionSetPage(newPage);

  t.plan(2);

  const actionLoadRecords = actions.actionLoadRecords(newState);
  actionLoadRecords(
    serverData.records,
    serverData.totalCount
  ).map(function(value) {
    t.is(value.page, newPage);
    t.is(value.totalCount, 30);
  });
});

test('actionLoadRecords and actionSetPage should be setted', (t) => {
  const actions = actionsCreator();
  const serverData = testData(30);

  let newPage = 5;
  let state = S.Maybe.of({
    page: 1,
    totalCount: 0,
    records: [],
  });
  const actionLoadRecords = actions.actionLoadRecords(state);
  let newState = actionLoadRecords(
    serverData.records,
    serverData.totalCount
  );
  const actionSetPage = actions.actionSetPage(newState);

  t.plan(2);

  actionSetPage(newPage).map(function(value) {
    t.is(value.page, newPage);
    t.is(value.totalCount, 30);
  });
});
