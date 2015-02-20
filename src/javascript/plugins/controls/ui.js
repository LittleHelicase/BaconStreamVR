
var $ = require("jquery");
var Bacon = require("bacon");
var fs = require("fs");

module.exports = function(options){
  var template = fs.readFileSync(__dirname + "/ui.html").toString();
  
  // apply template
  var dom = $($.parseHTML(template));
  
  var startStream = dom.find("[data-id='start']").asEventStream("click");
  var stopStream = dom.find("[data-id='pause']").asEventStream("click");
  return {
    startStream: startStream,
    stopStream: stopStream,
    html: dom
  };
}
