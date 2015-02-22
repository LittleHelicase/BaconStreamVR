
var Bacon = require("bacon")
var $ = require("jquery");

var loadedStream = new Bacon.Bus();
var stateStream = new Bacon.Bus();
var messageStream = new Bacon.Bus();

// loading a new scene
loadedStream.map(function(load){
  var scene = load.scene;
  var domBase = load.domBase;
  
  // release all plugged streams on the message bus
  messageStream.end();
  // create a clean new one...
  messageStream = new Bacon.Bus();
  
  // initializes it and plugs the state
  // into the stream bus
  var deinitialize = scene.initialize(domBase, messageStream);
  messageStream.push({type:"scene/loaded", value: scene});
  return deinitialize;
}).slidingWindow(2).onValue(function(deinitialize){
  // if present...
  if(deinitialize.length > 1){
    // ...deinitialize the previous scene
    deinitialize[0]();
  }
});

var renderMethodChanged = loadedStream.map(function(scene){
  return scene.ui.render;
});

messageStream.filter(function(v){ return v.type == "seek"; });

module.exports = {
  load: function(scene, domBase){
    domBase = domBase || $;
    loadedStream.push({scene: scene, domBase: domBase});
  }
}
