
var Bacon = require("bacon");

module.exports = {
  initialize: function(Scene, messages){
    var update = messages.filter(function(v){
      return v.type == "controls/update";
    });
    
    var initial = Scene.simulation.initialize(0.05);
    var state = Bacon.update(initial,
      [update],Scene.simulation.iterate);
      messages.plug(state.map(function(val){
        return {type:"simulation/state", value: val};
    }));
    
    return {
      streams: {state: state}
    }
  }
}
