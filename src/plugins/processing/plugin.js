
var processing = require("./processing.js");
var _ = require("lodash");
var uuid = require("node-uuid");

module.exports = {
  initialize: function(Scene, messages){
    if(!_.has(Scene, "processing")) return;
    var activeProcessing = null;
    var activeUUID = uuid.v4({rng:uuid.mathRNG});
    var canvasUUID = uuid.v4({rng: uuid.mathRNG});
    global.Scenes = global.Scenes || {};
    messages.onValue(function(v){
      if(v.type == "scene/loaded"){
        if(_.isObject(activeProcessing)){
          activeProcessing.exit();
          delete global.Scenes[activeUUID];
        }
        // to avoid conflicting instances create a uuid for the scenes
        // processing uses the global variable which must not collide with
        // other instances.
        global.Scenes[activeUUID] = {};
        activeProcessing =
          processing.render(Scene.processing.render,"#__processing__"+canvasUUID,activeUUID);
      }
    });
    _.each(Scene.processing.sync||[], function(sync){
      messages.filter(function(v){return v.type==sync.type;}).onValue(function(v){
        global.Scenes[activeUUID][sync.as] = v.value;
        global.Scenes[activeUUID].ready = true;
      });
    });
    return {
      name: "processing",
      streams: {},
      dom: {
        element: "#content", 
        dom: "<canvas id=\"__processing__"+canvasUUID+"\"></canvas>"
      }
    }
  }
}
