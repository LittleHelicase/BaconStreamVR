
var fs = require("fs");
var $ = require("jquery");
var Bacon = require("bacon");

Scene =  {
  name : "Moving in circles",
  plugins: [
    require("../../javascript/plugins/simulation/plugin.js"),
    require("../../javascript/plugins/controls/plugin.js"),
    require("../../javascript/plugins/history/plugin.js"),
    require("../../javascript/plugins/processing/plugin.js"),
    require("../../javascript/plugins/chart/plugin.js")
  ],
  processing: {
    render: fs.readFileSync(__dirname + "/circles.pde").toString(),
    sync: [
      {type: "simulation/state", as:"state"},
      {type: "history/state", as:"state"},
      {type: "history/history", as:"history"}
    ]
  },
  history: {
    store: "simulation/state"
  },
  chart: {
    data: "simulation/state",
    abscissa: "time",
    datasets: ["x","y"]
  },
  simulation: {
    step: 0.05,
    initialize: function(){
      return {x:1,y:0,time:0,iteration:0};
    },
    iterate: function(prev, step){
      var orth = {x:-prev.y,y:prev.x};
      return {
        x: prev.x + orth.x * step,
        y: prev.y + orth.y * step,
        time: prev.time + step,
        iteration: prev.iteration + 1
      }
    }
  }
}

module.exports = Scene;
