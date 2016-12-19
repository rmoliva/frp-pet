const chai = require('chai');
const expect = chai.expect;
const component = require('../../src/components/list');
const logger = require('../../src/logger');

describe('component/list', function() {
  const cmp = component();

  describe('initialState', function() {
    it('should have empty records', function() {
      expect(cmp.state$().records).to.eql([]);
    });
  });

  describe('loadRecords', function() {
    beforeEach(function() {
      cmp.action$(cmp.actions.loadRecords());
    });

    it('should have records filled', function() {
      cmp.state$().fork(logger.pp, function(state) {
        console.log('1--------------------')
        logger.pp(state)
        console.log('1--------------------')
        expect(state).to.eql({
          records: [{
            id: 1,
            name: 'Uno',
          }, {
            id: 2,
            name: 'Dos',
          }],
          page: 1,
          total: 2,
        });
      });
    });

    describe('setPage', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setPage(5));
      });

      it('should page setted to 5', function() {
        cmp.state$().fork(logger.pp, function(state) {
          console.log('2--------------------')
          logger.pp(state)
          console.log('2--------------------')

          expect(state.page).to.eql(5);
        });
      });
    });
  });

  describe('setPage', function() {
    beforeEach(function() {
      cmp.action$(cmp.actions.setPage(5));
    });

    it('should page setted to 5', function() {
      cmp.state$().fork(logger.pp, function(state) {
        console.log('3--------------------')
        logger.pp(state)
        console.log('3--------------------')

        expect(state.page).to.eql(5);
      });
    });

    describe('loadRecords', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.loadRecords());
      });

      it('should have empty records filled', function() {
        cmp.state$().fork(logger.pp, function(state) {
          console.log('4--------------------')
          logger.pp(state)
          console.log('4--------------------')
          expect(state).to.eql({
            records: [{
              id: 1,
              name: 'Uno',
            }, {
              id: 2,
              name: 'Dos',
            }],
            page: 5,
            total: 2,
          });
        });
      });
    });
  });
});
