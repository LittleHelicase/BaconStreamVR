

module.exports = {
  initialize: function(Scene,messages){
    var uiCreator = require("./ui.js");
    var ui = uiCreator({messageStream: messages});
    var dom = ui.html;
    var historyStream = messages.toEventStream()
      .filter(function(msg){ return msg.type == Scene.history.store; })
      .map(function(msg){ return msg.value; })
      .debounceImmediate(25)
      .slidingWindow(5000);
    
    historyStream.onValue(function(val){
      messages.push({type: "history/changed", length: val.length, history: val});
    });
    var history = historyStream.toProperty();
    var seekStream = historyStream.sampledBy(ui.seek, function(h,s){
      return h[s];
    });
    return {
      module: "history",
      streams: { "history/state": seekStream, "history/history": historyStream },
      dom: {element: "#ui", dom: dom}
    };
  }
};
