var $ = require('jquery');
var _ = require('lodash');
var fs = require("fs"); 
var Bacon = require("bacon");
var Scene = require("./scene");

$(function(){
  var circleScene = require("../scene/circle/scene.js");  
  Scene.load(circleScene);
});
 
