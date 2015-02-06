var $ = require("jquery");
var Bacon = require("bacon");

module.exports = function(start_id, end_id, interval){
  var startStream = $("[data-id='"+start_id+"']").asEventStream("click");
  var stopStream = $("[data-id='"+end_id+"']").asEventStream("click");
  var running = startStream.map(function(){ return true;})
    .merge(stopStream.map(function(){ return false; }))
    .skipDuplicates()
    .toProperty(false);
  var tick = Bacon.interval(interval,1);
  return tick.filter(running);
}
