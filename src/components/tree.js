const R = require('ramda');

// Tree operations must be inmutable over the array passed
const Tree = function(nodes) {
  const getRoots = function() {
    // Retrieve all nodes without parents
    let keys = R.filter(R.compose(R.isNil, R.prop('parent')), R.values(nodes));
    return R.props(R.map(R.prop('id'), keys), nodes);
  };

  const addNode = function(data) {
    let newNode = {
      id: data.id,
      data: data,
      children: [],
      parent: null,
    };

    // Anadir el node em el set
    nodes = R.assoc(data.id, newNode, nodes);
    return newNode;
  };

  const setParent = function(parentNodeId, childrenNodeId) {
    let parentNode = findNodeById(parentNodeId);
    let childrenNode = findNodeById(childrenNodeId);

    let newParentNode = R.merge(parentNode, {
      children: R.concat(
        R.defaultTo([], parentNode.children),
        [childrenNode.id]
      ),
    });

    let newChildrenNode = R.merge(childrenNode, {
      parent: newParentNode.id,
    });

    // Poner el nuevo elemento en la misma referencia
    nodes = R.assoc(newParentNode.id, newParentNode, nodes);
    nodes = R.assoc(newChildrenNode.id, newChildrenNode, nodes);

    return nodes;
  };

  const findNodeById = function(nodeId) {
    return R.prop(nodeId, nodes);
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
