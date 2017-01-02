'use strict';

const flyd = require('flyd');
const R = require('ramda');
const type = require('union-type');
const uuid = require('./uuid');
const ds = require('../ds');

/**
 * This is the Component constructor.
 * @typedef {Object} Component
 * @property {Object} actions - Object containing all the actions of the component.
 * @property {Stream} action$ - Stream where to put the actions.
 * @property {Stream} state$ - Stream where the component notifies its state.
 */
module.exports = function(options) {
  const _parseConfig = function(config) {
    if (!config) {
      config = {};
    }

    // Si hay un ID establecido no tocarlo
    if (!config.id) {
      // Si no hay ID generar uno propio
      config = R.merge(config, {id: uuid()});
    }

    // Si no hay items, inicializar un array vacio
    if (!config.items) {
      config = R.merge(config, {items: []});
    }
    return config;
  };

  const _checkConfig = function(initialState) {
    // Tiene que haber un id y un type
    if (!initialState.type) {
      throw new Error('No type defined for Component');
    }
    if (!initialState.id) {
      throw new Error('No ID defined for Component');
    }
  };

  return function(config) {
    let view$ = flyd.stream(); // Inicialmente es un stream vacio
    const action$ = flyd.stream();
    const init = R.always(R.merge(options.initialState, _parseConfig(config)));
    const initialState = init();

    // Comprobar que la configuracion es la esperada
    _checkConfig(initialState);

    const actions = type(options.actionTypes);

    const actionFn = (action, state) =>
      action.case(options.actionCase(state));

    const state$ = flyd.scan(R.flip(actionFn), initialState, action$);

    // ds('actions', action$);

    const destroy = function() {
      // Call destroy function if provided
      if (config.destroy) {
        config.destroy();
      }
      // TODO: Call children destroy functions
    };

    // Cada vez que se modifique el estado de este componente o alguna vista
    // de alguno de los hijos hay que notificar a la vista para que renderice
    // de nuevo
    const values$ = R.concat(
      [state$],
      R.map(
        R.prop('view$'),
        state$().items
      )
    );

    // Si se pasa una funcion de vista hay que generar un stream de vista
    // Asociado con dicha funcion y los cambios de vista en los hijos
    if (options.viewFn) {
      view$ = flyd.immediate(flyd.combine(
        options.viewFn({
          actions: actions,
          action$: action$,
          state$: state$,
        }),
        values$
      ));
    }

    return {
      id: initialState.id,
      actions: actions,
      action$: action$,
      state$: state$,
      view$: view$,
      destroy: destroy,
    };
  };
};
