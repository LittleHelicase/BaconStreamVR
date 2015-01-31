var $ = require('jquery');
var _ = require('lodash');
var fs = require("fs"); 
var processing = require("./processing");
var chart = require("./chart");
var Bacon = require("bacon");

$(function(){
  var pcode = fs.readFileSync(__dirname + '/scene.pde').toString("utf8");
  window.procCanv = processing.render(pcode,"#processing");
  
  chart.lineChart(_.map(_.range(30),function(v){return {x:v,y:v};}),{id:"chart"});
  
  var timer = Bacon.fromPoll(1000,function(val){
    return "A";
  })
  timer.take(5).onValue(function(value){
    console.log(value);
  });
});
 
