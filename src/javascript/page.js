var $ = require('jquery');
var _ = require('lodash');
var fs = require("fs"); 
var processing = require("./processing");
var chart = require("./chart");
var Bacon = require("bacon");
var Scene = require("./scene");

var circleScene = require("../scene/circle/scene.js");
/*
Scene.renderMethodChanged.onValue(function(val){
  if(_.isObject(window.procCanv)){
    window.procCanv.exit();
  }
  window.procCanv = processing.render(val,"#processing");
});
Scene.state.onValue(function(val){
  window.Simulation = window.Simulation || {};
  window.Simulation.state = val.currentState;
});

Scene.messages.onValue(function(val){
  if(val.type == "history-changed"){
    window.Simulation = window.Simulation || {};
    window.Simulation.history = val.history;
  }
})
*/
$(function(){
  var pcode = fs.readFileSync(__dirname + '/scene.pde').toString("utf8");
  //window.procCanv = processing.render(pcode,"#processing");
  
  //chart.lineChart(_.map(_.range(30),function(v){return {x:v,y:v};}),{id:"chart"});
//  chart.lineChart(Scene.update,Scene.state,{id:"chart"});
  
  Scene.load(circleScene);
});
 
