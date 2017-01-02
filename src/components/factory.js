const R = require('ramda');
const componentTree = require('./tree');
const baseComponent = require('./base');

const Factory = function() {
  // List of components registered
  const _componentDefinitions = {};

  // Arbol de componentes instanciados
  const _treeNodes = {};
  const _tree = componentTree(_treeNodes);

  const _typeShouldExist = function(config) {
    if (!config.type) {
      throw(new Error('No component type on config definition'));
    }

    if (!R.contains(config.type, R.keys(_componentDefinitions))) {
      throw(new Error(`Component type '${config.type}' not registered`));
    }
  };

  // const _extendConfig = function(config) {
  //   // Inject a dependency to this factory
  //   return R.merge(config, {
  //     _factory: this,
  //   });
  // };

  // Process child items
  const _instanceChildren = function(factory, items) {
    if (!items) {
      return []; // Si no hay hijos no seguir
    }

    // For each children
    return R.map(function(itemConfig) {
      // Inyectar el padre en la configuracion del hijo
      return factory.instance(itemConfig);
    }, items);
  };

  // Tree assignment
  const _treeNodeComponent = function(component, treeItemNodes) {
    // Gestion del arbol de componentes
    // Anadimos el elemento al Arbol
    let treeNode = _tree.addNode(component);

    // Asginar este como padre de todos los hijos
    R.forEach(function(treeItemNode) {
      _tree.setParent(treeNode, treeItemNode);
    }, treeItemNodes);

    return _tree.findNodeById(treeNode.id);
  };

  return {
    treeManager: _tree,

    register: function(type, definition) {
      if (!_componentDefinitions[type]) {
        _componentDefinitions[type] = definition;
      }
      return _componentDefinitions;
    },

    // Instanciar un componente definido por su configuracion
    // Debe contener la clave
    instance: function(config) {
      // Check for validity data
      _typeShouldExist(config);

      // Convert children form definition to Component objects
      let treeItemNodes = _instanceChildren(this, config.items);

      // Instantiate Component object
      let component = baseComponent(_componentDefinitions[config.type])(
        R.merge(config, {items: R.map(R.prop('data'), treeItemNodes)})
      );

      return _treeNodeComponent(component, treeItemNodes);
    },
  };
};

module.exports = Factory;
