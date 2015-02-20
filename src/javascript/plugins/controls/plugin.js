
var Bacon = require("bacon");

module.exports = {
  initialize: function(Scene, messages){
    var uiCreator = require("./ui.js");
    var ui = uiCreator({messageStream: messages});
    
    var running = ui.startStream.map(function(){ return true;})
      .merge(ui.stopStream.map(function(){ return false; }))
      .skipDuplicates()
      .toProperty(false);
    var tick = Bacon.interval(25,1);
    return tick.filter(running);
    
    return {
      streams: {"controls/update": ui.update},
      dom: [{element: "#ui", dom: ui.html}]
    };
  }
};
