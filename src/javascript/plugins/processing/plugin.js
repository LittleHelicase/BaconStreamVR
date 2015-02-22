
var processing = require("./processing.js");
var _ = require("lodash");

module.exports = {
  initialize: function(Scene, messages){
    var activeProcessing = null;
    messages.onValue(function(v){
      if(v.type == "scene/loaded" && _.has(Scene, "processing")){
        if(_.isObject(activeProcessing)){
          activeProcessing.exit();
        }
        activeProcessing =
          processing.render(Scene.processing,"#__processing__");
      }
    });
    
    return {
      name: "processing",
      streams: {},
      dom: {
        element: "#content", 
        dom: "<canvas id=\"__processing__\"></canvas>"
      }
    }
  }
}
