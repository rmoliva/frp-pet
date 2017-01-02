const chai = require('chai');
const expect = chai.expect;
const M = require('monet');
const tabpanel = require('./component');
const baseComponent = require('../../base');

describe('components/tabpanel', function() {
  describe('initialState', function() {
    const cmp = baseComponent(tabpanel)();

    it('type should be tabpanel', function() {
      expect(cmp.state$().type).to.eql('tabpanel');
    });

    it('visible should be true', function() {
      expect(cmp.state$().visible).to.be.true;
    });

    it('title should be empty string', function() {
      expect(cmp.state$().title).to.be.eql('');
    });
  });

  describe('setVisible', function() {
    const cmp = baseComponent(tabpanel)();
    beforeEach(function() {
      cmp.action$(cmp.actions.setVisible(false));
    });
    it('visible should be false', function() {
      expect(cmp.state$().visible).to.be.false;
    });
  });

  describe('setTitle', function() {
    const cmp = baseComponent(tabpanel)();
    describe('Some', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setTitle(M.Some('hola')));
      });
      it('title should be set', function() {
        expect(cmp.state$().title).to.eql('hola');
      });
    });
    describe('None', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setTitle(M.None()));
      });
      it('title should not be set', function() {
        expect(cmp.state$().title).to.eql('');
      });
    });
  });
});
