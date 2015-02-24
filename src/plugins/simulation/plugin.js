
var Bacon = require("bacon");

module.exports = {
  initialize: function(Scene, messages){
    var update = messages.filter(function(v){
      return v.type == "controls/update";
    });
    
    var initial = Scene.simulation.initialize();
    var step = Bacon.constant(Scene.simulation.step);
    var state = Bacon.update(initial,
      [step,update],Scene.simulation.iterate);
    
    return {
      module: "simulation",
      streams: {"simulation/state": state}
    }
  }
}
