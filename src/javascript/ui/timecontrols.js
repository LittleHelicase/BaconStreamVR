
var fs = require("fs");
var streamUpdate = require("../util/stream.update.js");

module.exports = function(options){
  var uiID = options.id;
  var messages = options.messageStream;
  var template = fs.readFileSync(__dirname + "/timecontrols.html").toString();
  
  // apply template
  $(uiID).html("");
  var ui = $(uiID).append(template);
  
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
