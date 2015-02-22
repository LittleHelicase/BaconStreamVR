
var Bacon = require("bacon");

module.exports = {
  initialize: function(Scene, messages){
    var update = messages.filter(function(v){
      return v.type == "controls/update";
    });
    
    var initial = Scene.simulation.initialize(0.05);
    var state = Bacon.update(initial,
      [update],Scene.simulation.iterate);
    
    return {
      module: "simulation",
      streams: {"simulation/state": state}
    }
  }
}
