

module.exports = {
  initialize: function(Scene,messages){
    var uiCreator = require("./ui.js");
    var ui = uiCreator({messageStream: messages});
    var dom = ui.html;
    var historyStream = messages.toEventStream()
      .filter(function(msg){ return msg.type == "simulation/state"; })
      .debounceImmediate(25)
      .slidingWindow(5000);
    
    historyStream.onValue(function(val){
      messages.push({type: "history/changed", length: val.length, history: val});
    });
    var seekStream = ui.seek.combine(historyStream, function(s,h){
      return h[s];
    });
    return {
      streams: { "history/state": seekStream },
      dom: {element: "#id", dom: dom}
    };
  }
};
