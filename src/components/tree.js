const R = require('ramda');

// Tree operations must be inmutable over the array passed
const Tree = function(nodes) {
  const getRoots = function() {
    // Retrieve all nodes without parents
    return R.filter(R.compose(R.isNil, R.prop('parent')), nodes);
  };

  const addNode = function(data) {
    let newNode = {
      id: data.id,
      data: data,
      children: [],
      parent: null,
    };

    // Anadir el node directamente al array
    nodes = R.concat(nodes, [newNode]);
    return newNode;
  };

  const setParent = function(parentNode, childrenNode) {
    let newParentNode = R.merge(parentNode, {
      children: R.concat(
        R.defaultTo([], parentNode.children),
        [childrenNode.id]
      ),
    });

    let newChildrenNode = R.merge(childrenNode, {
      parent: newParentNode.id,
    });

    // Quitar los nodos anteriores
    nodes = R.reject(function(node) {
      return (node.id === parentNode.id || node.id === childrenNode.id);
    }, nodes);

    // Anadir los nuevos nodos
    nodes = R.concat(nodes, [newParentNode, newChildrenNode]);
  };

  const findNodeById = function(nodeId) {
    return R.find(R.propEq('id', nodeId), nodes);
  };

  const clean = function(callback) {
    nodes = [];
  };

  return {
    getRoots: getRoots,
    addNode: addNode,
    setParent: setParent,
    findNodeById: findNodeById,
    clean: clean,
  };
};

module.exports = Tree;
