
var $ = require("jquery");
require("./processing.min.js");

module.exports = {
  render: function(code, canvasID, uuid) {
    var canvas = $(canvasID)[0];
    code = "// get an alias to the current scene\nvar Scene = window.Scenes['"+uuid+"'];\n\n" + code;
    var sketch = Processing.compile(code);
    var processingCanv = new Processing(canvas, sketch);
    return processingCanv;
  }
}
