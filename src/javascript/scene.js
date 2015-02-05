
var Bacon = require("bacon")

var loadedStream = new Bacon.Bus();
var stateStream = new Bacon.Bus();

// loading a new scene
loadedStream.map(function(scene){
    // initializes it and plugs the state
    // into the stream bus
    return stateStream.plug(scene.initialize());
  }).slidingWindow(2).onValue(function(unplugs){
    // if present...
    if(unplugs.length > 1){
      // ...unplug the previous stateStream
      unplugs[0]();
    }
  });

var renderMethodChanged = loadedStream.map(function(scene){
  return scene.ui.render;
});

module.exports = {
  load: function(scene){
    loadedStream.push(scene);
  },
  // observable streams
  renderMethodChanged: renderMethodChanged,
  stateChanged: stateStream
}
