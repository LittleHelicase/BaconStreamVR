
var charts = require("./chart.js");
var uuid = require("node-uuid");

module.exports = {
  initialize: function(Scene,messages){
    var sceneLoaded = messages.filter(function(v){
      return v.type == "scene/loaded";
    }).map(function(v){
      return v.value;
    });
    
    var states = messages.filter(function(v){
      return v.type == "simulation/state";
    }).map(function(v){
      return v.value;
    });
    
    var chartUUID = uuid.v4({rng: uuid.mathRGN});
    charts.lineChart(sceneLoaded, states, {id: "__chart__"+chartUUID});
    
    return {
      module: "charts",
      streams: { },
      dom: {element: "#content", dom: "<div id='__chart__"+chartUUID+"''></div>'"}
    };
  }
};
