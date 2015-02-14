
var fs = require("fs");
var $ = require("jquery");
var Bacon = require("bacon");
var streamUpdate = require("../../javascript/util/stream.update.js");

Scene =  {
  name : "Moving in circles",
  initialize: function(messages){
    var ui = Scene.ui.initialize(messages);
    var update = ui.update;
    var initial = Scene.simulation.initialize(0.05);
    var state = Bacon.update(initial,
      [update],Scene.simulation.iterate);
    var historyStream = state.toEventStream()
      .debounceImmediate(25)
      .slidingWindow(5000);
        
    historyStream.onValue(function(val){
      messages.push({type: "history-changed", length: val.length, history: val});
    });
    var seekStream = ui.seek.combine(historyStream, function(s,h){
      return h[s];
    });
    return state.toEventStream().merge(seekStream);
  },
  ui: {
    render: fs.readFileSync(__dirname + "/circles.pde").toString(),
    template: fs.readFileSync(__dirname + "/ui.html").toString(),
    initialize: function(messages){
      $("#ui").html("");
      var ui = $("#ui").append(Scene.ui.template);
      
      messages.onValue(function(val){
        if(val.type=="history-changed"){
          ui.find("[data-id='seeker']").attr("min",0);
          ui.find("[data-id='seeker']").attr("max",val.length-1);
          ui.find("[data-id='seeker']").val(val.length-1);
        }
      });
      
      var seek =  ui.find("[data-id='seeker']")
        .asEventStream("input")
        .map(function(val){
          return val.target.value;
        });
      
      
      return {
        update: streamUpdate("start", "pause",25),
        seek: seek
      };
    }
  },
  simulation: {
    initialize: function(step){
      return {x:1,y:0,time:0,step:step,iteration:0};
    },
    iterate: function(prev){
      var orth = {x:-prev.y,y:prev.x};
      return {
        x: prev.x + orth.x * prev.step,
        y: prev.y + orth.y * prev.step,
        time: prev.time + prev.step,
        step: prev.step,
        iteration: prev.iteration + 1
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
