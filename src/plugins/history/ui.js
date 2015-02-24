
var fs = require("fs");

module.exports = function(options){
  var messages = options.messageStream;
  var template = fs.readFileSync(__dirname + "/ui.html").toString();
  
  // apply template
  var ui = $($.parseHTML(template));
  
  messages.onValue(function(val){
    if(val.type=="history/changed"){
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
    seek: seek,
    html: ui
  };
}
