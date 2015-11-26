
var _ = require('lodash')

module.exports = {
  initialize: function(Scene,messages){
    messages.toEventStream()
      .filter(function(msg){ return _.contains(Scene.log, msg.type); })
      .log()

    return {
      module: "log",
    };
  }
};
