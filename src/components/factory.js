
const baseComponent = require('./base');

module.exports = function() {
  // List of components registered
  const componentDefinitions = {};

  return {
    register: function(type, definition) {
      // TODO: Comprobar que el componente viene con una clave
      if (!componentDefinitions[type]) {
        componentDefinitions[type] = definition;
      }
      return componentDefinitions;
    },

    // this.remove = function(userId){
    //     if(socketList[userId]){
    //         delete socketList[userId];
    //     }
    // };

    // Instanciar un componente definido por su configuracion
    // Debe contener la clave
    instance: function(config) {
      console.log('INSTANCE');
      console.log(config);


      return baseComponent(componentDefinitions[config.type])(config);
    },
  };
};
