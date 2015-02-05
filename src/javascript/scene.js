
var Bacon = require("bacon")

var loadedStream = new Bacon.Bus();
loadedStream.onValue(function(scene){
  // initialize the UI
  scene.ui.initialize();
})

module.exports = {
  load: function(scene){
    loadedStream.push(scene);
  },
  // observable streams
  sceneLoaded: loadedStream
}
