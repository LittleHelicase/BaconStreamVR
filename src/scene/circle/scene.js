
var fs = require("fs");

Scene =  {
  name : "Moving in circles",
  plugins: [
    require("../../plugins/simulation/plugin.js"),
    require("../../plugins/controls/plugin.js"),
    //require("../../plugins/log/plugin.js"),
    require("../../plugins/chart/plugin.js"),
    require("../../plugins/processing/plugin.js"),
    require("../../plugins/history/plugin.js"),
  ],
  simulation: {
    step: 0.03,
    initialize: function(){
      return {x:1,y:0,time:0,iteration:0};
    },
    iterate: function(prev, step){
      //var orth = {x:-prev.y*prev.y*prev.y*prev.y*prev.y,y:prev.x*prev.x*prev.x};
      var orth = {x:-prev.y,y:prev.x};
      return {
        x: prev.x + orth.x * step,
        y: prev.y + orth.y * step,
        time: prev.time + step,
        iteration: prev.iteration + 1
      }
    }
  },
  log: ["simulation/state"],
  chart: {
    data: "simulation/state",
    abscissa: "time",
    datasets: ["x", "y"]
  },
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
  }
}

module.exports = Scene;
