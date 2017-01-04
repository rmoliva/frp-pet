const chai = require('chai');
const expect = chai.expect;
const M = require('monet');
const input = require('./component');
const baseComponent = require('../../base');

describe('components/form/input', function() {
  describe('initialState', function() {
    const cmp = baseComponent(input)();

    it('type should be input', function() {
      expect(cmp.state$().type).to.eql('input');
    });

    it('value should be empty', function() {
      expect(cmp.state$().value).to.eql('');
    });

    it('name should be empty', function() {
      expect(cmp.state$().name).to.eql('');
    });

    it('icon should be empty', function() {
      expect(cmp.state$().icon).to.eql('');
    });

    it('inputtype should be text', function() {
      expect(cmp.state$().inputtype).to.eql('text');
    });

    it('loading should be false', function() {
      expect(cmp.state$().loading).to.be.false;
    });

    it('placeholder should be empty', function() {
      expect(cmp.state$().placeholder).to.eql('');
    });

    it('disabled should be false', function() {
      expect(cmp.state$().disabled).to.be.false;
    });

    it('error should be false', function() {
      expect(cmp.state$().error).to.be.false;
    });

    it('fluid should be false', function() {
      expect(cmp.state$().fluid).to.be.false;
    });

    it('transparent should be false', function() {
      expect(cmp.state$().transparent).to.be.false;
    });
  });

  describe('setValue', function() {
    const cmp = baseComponent(input)();
    describe('Some', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setValue(M.Some('hola')));
      });
      it('value should be set', function() {
        expect(cmp.state$().value).to.eql('hola');
      });
    });
    describe('None', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setValue(M.None()));
      });
      it('value should not be set', function() {
        expect(cmp.state$().value).to.eql('');
      });
    });
  });

  describe('setName', function() {
    const cmp = baseComponent(input)();
    beforeEach(function() {
      cmp.action$(cmp.actions.setName('nombre'));
    });
    it('name should be set', function() {
      expect(cmp.state$().name).to.eql('nombre');
    });
  });

  describe('setIcon', function() {
    const cmp = baseComponent(input)();
    describe('Some', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setIcon(M.Some('icon')));
      });
      it('icon should be set', function() {
        expect(cmp.state$().icon).to.eql('icon');
      });
    });
    describe('None', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setIcon(M.None()));
      });
      it('icon should not be set', function() {
        expect(cmp.state$().icon).to.eql('');
      });
    });
  });

  describe('setInputType', function() {
    const cmp = baseComponent(input)();
    describe('Some', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setInputType(M.Some('password')));
      });
      it('inputtype should be set', function() {
        expect(cmp.state$().inputtype).to.eql('password');
      });
    });
    describe('None', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setInputType(M.None()));
      });
      it('inputtype should not be set', function() {
        expect(cmp.state$().inputtype).to.eql('text');
      });
    });
  });

  describe('setLabel', function() {
    const cmp = baseComponent(input)();
    describe('Some', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setLabel(M.Some('label')));
      });
      it('label should be set', function() {
        expect(cmp.state$().label).to.eql('label');
      });
    });
    describe('None', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setLabel(M.None()));
      });
      it('label should not be set', function() {
        expect(cmp.state$().label).to.eql('');
      });
    });
  });

  describe('setPlaceholder', function() {
    const cmp = baseComponent(input)();
    describe('Some', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setPlaceholder(M.Some('placeholder')));
      });
      it('placeholder should be set', function() {
        expect(cmp.state$().placeholder).to.eql('placeholder');
      });
    });
    describe('None', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setPlaceholder(M.None()));
      });
      it('placeholder should not be set', function() {
        expect(cmp.state$().placeholder).to.eql('');
      });
    });
  });

  describe('setWide', function() {
    const cmp = baseComponent(input)();
    describe('Some', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setWide(M.Some(10)));
      });
      it('wide should be set', function() {
        expect(cmp.state$().wide).to.eql(10);
      });
    });
    describe('None', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setWide(M.None()));
      });
      it('wide should not be set', function() {
        expect(cmp.state$().wide).to.eql(0);
      });
    });
  });

  describe('setDisabled', function() {
    const cmp = baseComponent(input)();
    beforeEach(function() {
      cmp.action$(cmp.actions.setDisabled(true));
    });
    it('disabled should be true', function() {
      expect(cmp.state$().disabled).to.be.true;
    });
  });

  describe('setError', function() {
    const cmp = baseComponent(input)();
    beforeEach(function() {
      cmp.action$(cmp.actions.setError(true));
    });
    it('error should be true', function() {
      expect(cmp.state$().error).to.be.true;
    });
  });

  describe('setFluid', function() {
    const cmp = baseComponent(input)();
    beforeEach(function() {
      cmp.action$(cmp.actions.setFluid(true));
    });
    it('fluid should be true', function() {
      expect(cmp.state$().fluid).to.be.true;
    });
  });

  describe('setLoading', function() {
    const cmp = baseComponent(input)();
    beforeEach(function() {
      cmp.action$(cmp.actions.setLoading(true));
    });
    it('loading should be true', function() {
      expect(cmp.state$().loading).to.be.true;
    });
  });

  describe('setReadOnly', function() {
    const cmp = baseComponent(input)();
    beforeEach(function() {
      cmp.action$(cmp.actions.setReadOnly(true));
    });
    it('readonly should be true', function() {
      expect(cmp.state$().readonly).to.be.true;
    });
  });

  describe('setRequired', function() {
    const cmp = baseComponent(input)();
    beforeEach(function() {
      cmp.action$(cmp.actions.setRequired(true));
    });
    it('required should be true', function() {
      expect(cmp.state$().required).to.be.true;
    });
  });

  describe('setTransparent', function() {
    const cmp = baseComponent(input)();
    beforeEach(function() {
      cmp.action$(cmp.actions.setTransparent(true));
    });
    it('transparent should be true', function() {
      expect(cmp.state$().transparent).to.be.true;
    });
  });
});
