const chai = require('chai');
const expect = chai.expect;
const flyd = require('flyd');
const type = require('union-type');
const R = require('ramda');
const M = require('monet');
const baseComponent = require('./base');

describe('components/base', function() {
  // TODO
  const isMaybe = R.T;

  // Definir estado inicial
  const initialState = {
    disabled: false,
    text: '',
  };

  // Definir action types de prueba
  const actionTypes = {
    setDisabled: [Boolean],
    setText: [isMaybe],
  };

  // Definir la resolucion de los actionTypes
  const actionCase = function(state) {
    return {
      // setDisabled:: (boolean) => state
      setDisabled: (disabled) => R.merge(state, {disabled: disabled}),
      // setText:: (Maybe) => state
      setText: (text) => R.merge(state, {text: text.orSome('')}),
    };
  };

  const componentDefinition = {
    initialState: initialState,
    actionTypes: actionTypes,
    actionCase: actionCase,
  };

  const testComponent = baseComponent(componentDefinition);

  describe('_getID', function() {
    describe('without an ID in the config', function() {
      beforeEach(function() {
        // With an ID, componen state should return that ID
        this.testComponentID = testComponent({
          disabled: true,
          text: 'text',
        });
      });

      it('should return some ID', function() {
        expect(this.testComponentID.state$().id).to.not.be.null;
      });
    });

    describe('with an ID in the config', function() {
      beforeEach(function() {
        const def = {
          id: 'testComponentID',
          disabled: true,
          text: 'text',
        };

        // With an ID, componen state should return that ID
        this.testComponentID = testComponent(def);
      });

      it('should return the specified ID', function() {
        expect(this.testComponentID.state$().id).to.eql('testComponentID');
      });
    });
  });

  describe('with a config component', function() {
    const cmp = testComponent({
      disabled: true,
      text: 'text',
    });
    it('text should be text', function() {
      expect(cmp.state$().text).to.eql('text');
    });

    it('disabled should be true', function() {
      expect(cmp.state$().disabled).to.be.true;
    });
  });

  describe('with a default config component', function() {
    beforeEach(function() {
      this.cmp = testComponent();
    });

    it('text should be empty', function() {
      expect(this.cmp.state$().text).to.eql('');
    });

    it('disabled should be false', function() {
      expect(this.cmp.state$().disabled).to.be.false;
    });

    it('component should return available actions', function() {
      expect(this.cmp.actions).to.have.all.keys(R.keys(this.cmp.actions));
    });

    describe('invoking a setText action should change state', function() {
      describe('Some', function() {
        beforeEach(function() {
          this.cmp.action$(this.cmp.actions.setText(M.Some('hola')));
        });
        it('text should be set', function() {
          expect(this.cmp.state$().text).to.eql('hola');
        });
      });
      describe('None', function() {
        beforeEach(function() {
          this.cmp.action$(this.cmp.actions.setText(M.None()));
        });
        it('text should not be set', function() {
          expect(this.cmp.state$().text).to.eql('');
        });
      });
    });

    describe('invoking a setDisabled action should change state', function() {
      beforeEach(function() {
        this.cmp.action$(this.cmp.actions.setDisabled(true));
      });
      it('disabled should be true', function() {
        expect(this.cmp.state$().disabled).to.be.true;
      });
    });
  });
});
