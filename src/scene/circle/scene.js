
var fs = require("fs");
var $ = require("jquery");
var Bacon = require("bacon");
var streamUpdate = require("../../javascript/util/stream.update.js");

Scene =  {
  name : "Moving in circles",
  initialize: function(){
    var update = Scene.ui.initialize().update;
    var initial = Scene.simulation.initialize(0.05);
    var state = Bacon.update(initial,
      [update],Scene.simulation.iterate);
    return state;
  },
  ui: {
    render: fs.readFileSync(__dirname + "/circles.pde").toString(),
    template: fs.readFileSync(__dirname + "/ui.html").toString(),
    initialize: function(){
      $("#ui").html("");
      $("#ui").append(Scene.ui.template);
      return {update: streamUpdate("start", "pause",25)};
    }
  },
  simulation: {
    initialize: function(step){
      return {x:1,y:0,time:0,step:step};
    },
    iterate: function(prev){
      var orth = {x:-prev.y,y:prev.x};
      return {
        x: prev.x + orth.x * prev.step,
        y: prev.y + orth.y * prev.step,
        time: prev.time + prev.step,
        step: prev.step
      }
    },
    properties: ["x","y","time"],
    query: function(state, prop){
      switch(prop){
        case "x": return state.x;
        case "y": return state.y;
        case "time": return state.time;
      }
      throw new Error("Unknown property " + prop);
    }
  }
}

module.exports = Scene;
