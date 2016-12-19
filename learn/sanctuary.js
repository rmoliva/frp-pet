'use strict';

const pp = (json) => console.log(JSON.stringify(json, undefined, 2));

// We load the library by "require"-ing it
const S = require('sanctuary');
const R = require('ramda');
const Task = require('data.task');

const testData = [{
  id: 1,
  name: 'Uno',
}, {
  id: 2,
  name: 'Dos',
}];

const initialState = {
  records: [],
};

// read : () -> Task(Left, Right)
const loadRecords = () =>
  new Task((reject, resolve) =>
    resolve(testData)
  ).fork(
    S.Left,
    S.Right
  );

loadRecords().map(
  (res) => R.merge(initialState, {records: res})
).map(
  pp
);

// const m = S.Maybe.of(3);
// m.map(console.log);
