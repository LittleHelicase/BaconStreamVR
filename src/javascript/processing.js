
var $ = require("jquery");
require("./processing.min.js");

module.exports = {
  render: function(code, canvasID) {
    var canvas = $(canvasID)[0];
    var sketch = Processing.compile(code);
    new Processing(canvas, sketch);
  }
}
