

module.exports = {
  name : "Moving in circles",
  render : require("./circles.pde"),
  init: function(step){
    return {x:1,y:0,time:0,step:step};
  },
  iter: function(prev){
    var orth = {x:-prev.y,y:prev.x};
    return {
      x: prev.x + orth.x * prev.step,
      y: prev.y + orth.y * prev.step
      time: prev.time + prev.step,
      step: prev.step
    }
  },
  properties: ["x","y","time"],
  query: function(state, prop){
    switch(prop){
      case "x": return state.x;
      case "y": return state.x;
      case "time": return state.time;
    }
    throw new Error("Unknown property " + prop);
  }
}
