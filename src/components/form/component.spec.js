const chai = require('chai');
const expect = chai.expect;
const form = require('./component');
const baseComponent = require('../base');

describe('components/form', function() {
  describe('initialState', function() {
    const cmp = baseComponent(form)();

    it('type should be fields', function() {
      expect(cmp.state$().type).to.eql('form');
    });

    it('visible should be true', function() {
      expect(cmp.state$().visible).to.be.true;
    });

    it('loading should be false', function() {
      expect(cmp.state$().loading).to.be.false;
    });
  });

  describe('setVisible', function() {
    const cmp = baseComponent(form)();
    beforeEach(function() {
      cmp.action$(cmp.actions.setVisible(false));
    });
    it('visible should be false', function() {
      expect(cmp.state$().visible).to.be.false;
    });
  });

  describe('setLoading', function() {
    const cmp = baseComponent(form)();
    beforeEach(function() {
      cmp.action$(cmp.actions.setLoading(true));
    });
    it('loading should be true', function() {
      expect(cmp.state$().loading).to.be.true;
    });
  });
});
