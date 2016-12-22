const test = require('ava');

const actionsCreator = require('./actions');
const S = require('sanctuary');
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

  actionSetPage(newPage).fork(console.error, function(newState) {
    newState.map(function(value) {
      t.is(value.page, newPage);
    });
  });
});

test('actionLoadRecords should be setted', (t) => {
  const actions = actionsCreator();
  let newPage = 5;
  let state = S.Maybe.of({
    page: 1,
    totalCount: 0,
    records: [],
  });
  const actionLoadRecords = actions.actionLoadRecords(state);

  t.plan(2);

  actionLoadRecords(newPage).fork(console.error, function(newState) {
    newState.map(function(value) {
      t.is(value.page, 1);
      t.is(value.totalCount, 30);
    });
  });
});

test('actionSetPage and actionLoadRecords should be setted', (t) => {
  const actions = actionsCreator();
  let newPage = 5;
  let state = S.Maybe.of({
    page: 1,
    totalCount: 0,
    records: [],
  });
  const actionSetPage = actions.actionSetPage(state);

  t.plan(2);

  actionSetPage(newPage).fork(console.error, function(newState) {
    const actionLoadRecords = actions.actionLoadRecords(newState);
    actionLoadRecords().fork(console.error, function(newState) {
      newState.map(function(value) {
        t.is(value.page, newPage);
        t.is(value.totalCount, 30);
      });
    });
  });
});

test('actionLoadRecords and actionSetPage should be setted', (t) => {
  const actions = actionsCreator();
  let newPage = 5;
  let state = S.Maybe.of({
    page: 1,
    totalCount: 0,
    records: [],
  });
  const actionLoadRecords = actions.actionLoadRecords(state);

  t.plan(2);

  actionLoadRecords().fork(console.error, function(newState) {
    const actionSetPage = actions.actionSetPage(newState);
    actionSetPage(newPage).fork(console.error, function(newState) {
      newState.map(function(value) {
        t.is(value.page, newPage);
        t.is(value.totalCount, 30);
      });
    });
  });
});

// describe('actionSetPage', function() {
//
//   beforeEach(function() {
//   });
//
//   describe('set page', function() {
//     it('should be setted', function() {
//     });
//
//     // describe('set records', function() {
//     //   it('should be setted', function() {
//     //     this.actionLoadRecords().map(function(error, newState) {
//     //       debug('newState', newState);
//     //       expect(newState.totalCount).to.equal(30);
//     //       expect(newState.page).to.equal(newPage);
//     //     });
//     //   });
//     // });
//   });
// });
