const chai = require('chai');
const expect = chai.expect;
const tab = require('./component');
const baseComponent = require('../base');

describe('components/tab', function() {
  describe('initialState', function() {
    const cmp = baseComponent(tab)();

    it('type should be tab', function() {
      expect(cmp.state$().type).to.eql('tab');
    });

    it('visible should be true', function() {
      expect(cmp.state$().visible).to.be.true;
    });

    it('active should be 0', function() {
      expect(cmp.state$().active).to.eql(0);
    });

    it('loading should be false', function() {
      expect(cmp.state$().loading).to.be.false;
    });
  });

  describe('setActive', function() {
    const cmp = baseComponent(tab)();
    beforeEach(function() {
      cmp.action$(cmp.actions.setActive(5));
    });
    it('active should be 5', function() {
      expect(cmp.state$().active).to.eql(5);
    });
  });

  describe('setVisible', function() {
    const cmp = baseComponent(tab)();
    beforeEach(function() {
      cmp.action$(cmp.actions.setVisible(false));
    });
    it('visible should be false', function() {
      expect(cmp.state$().visible).to.be.false;
    });
  });

  describe('setLoading', function() {
    const cmp = baseComponent(tab)();
    beforeEach(function() {
      cmp.action$(cmp.actions.setLoading(true));
    });
    it('loading should be true', function() {
      expect(cmp.state$().loading).to.be.true;
    });
  });
});
