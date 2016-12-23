const test = require('ava');

const actionsCreator = require('./actions');
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
  let state = {
    page: 1,
    totalCount: 0,
    records: [],
  };
  const actionSetPage = actions.actionSetPage(state);
  // const actionLoadRecords = actions.actionLoadRecords(state);

  t.plan(2);

  const newState = actionSetPage(newPage);
  t.is(newState.page, newPage);
  t.is(newState.totalCount, 0);
});

test('actionLoadRecords with Right should be setted', (t) => {
  const actions = actionsCreator();
  const serverData = testData(30);
  let state = {
    page: 1,
    totalCount: 0,
    records: [],
  };
  const actionLoadRecords = actions.actionLoadRecords(state);
  const newState = actionLoadRecords(serverData);

  t.plan(2);
  t.is(newState.page, 1);
  t.is(newState.totalCount, 30);
});

test('actionLoadRecords with Left should not be setted', (t) => {
  const actions = actionsCreator();
  const error = 'Server Connection';
  const serverData = testData(30, error);
  let state = {
    page: 1,
    totalCount: 0,
    records: [],
  };
  const actionLoadRecords = actions.actionLoadRecords(state);
  const newState = actionLoadRecords(serverData);

  t.plan(3);
  t.is(newState.page, 1);
  t.is(newState.totalCount, 0);
  t.is(newState.error, error);
});

test('actionSetPage and Right actionLoadRecords should be setted', (t) => {
  const actions = actionsCreator();
  const serverData = testData(30);

  let newPage = 5;
  let state = {
    page: 1,
    totalCount: 0,
    records: [],
  };
  const actionSetPage = actions.actionSetPage(state);
  let newState = actionSetPage(newPage);

  t.plan(2);

  const actionLoadRecords = actions.actionLoadRecords(newState);
  newState = actionLoadRecords(serverData);

  t.is(newState.page, newPage);
  t.is(newState.totalCount, 30);
});

test('actionSetPage and Left actionLoadRecords should be setted', (t) => {
  const actions = actionsCreator();
  const error = 'Connection error';
  const serverData = testData(30, error);

  let newPage = 5;
  let state = {
    page: 1,
    totalCount: 0,
    records: [],
  };
  const actionSetPage = actions.actionSetPage(state);
  let newState = actionSetPage(newPage);

  t.plan(3);

  const actionLoadRecords = actions.actionLoadRecords(newState);
  newState = actionLoadRecords(serverData);

  t.is(newState.page, newPage);
  t.is(newState.totalCount, 0);
  t.is(newState.error, error);
});

test('Right actionLoadRecords and actionSetPage should be setted', (t) => {
  const actions = actionsCreator();
  const serverData = testData(30);

  let newPage = 5;
  let state = {
    page: 1,
    totalCount: 0,
    records: [],
  };
  const actionLoadRecords = actions.actionLoadRecords(state);
  let newState = actionLoadRecords(serverData);
  const actionSetPage = actions.actionSetPage(newState);
  newState = actionSetPage(newPage);

  t.plan(2);

  t.is(newState.page, newPage);
  t.is(newState.totalCount, 30);
});

test('Left actionLoadRecords and actionSetPage should be setted', (t) => {
  const actions = actionsCreator();
  const error = 'Server Error';
  const serverData = testData(30, error);

  let newPage = 5;
  let state = {
    page: 1,
    totalCount: 0,
    records: [],
  };
  const actionLoadRecords = actions.actionLoadRecords(state);
  let newState = actionLoadRecords(serverData);
  const actionSetPage = actions.actionSetPage(newState);
  newState = actionSetPage(newPage);

  t.plan(3);

  t.is(newState.page, newPage);
  t.is(newState.totalCount, 0);
  t.is(newState.error, error);
});
