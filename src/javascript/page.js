var $ = require('jquery');
var _ = require('lodash');
var fs = require("fs"); 
var processing = require("./processing");
var chart = require("./chart");
var Bacon = require("bacon");
var Scene = require("./scene");

var circleScene = require("../scene/circle/scene.js");

Scene.sceneLoaded.onValue(function(val){
  window.procCanv = processing.render(val.ui.render,"#processing");
});

$(function(){
  var pcode = fs.readFileSync(__dirname + '/scene.pde').toString("utf8");
  window.procCanv = processing.render(pcode,"#processing");
  
  chart.lineChart(_.map(_.range(30),function(v){return {x:v,y:v};}),{id:"chart"});
  
  Scene.load(circleScene);
});
 
