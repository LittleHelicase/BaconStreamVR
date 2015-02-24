
var _ = require("lodash");

function loadPlugins(Scene, messages){
  var plugins = Scene.plugins;

  // every plugin has a initialize function
  return _.map(plugins, function(p){
    return p.initialize(Scene,messages);
  });
}

function initStreams(Scene, modules, messages){
  // combine streams with equal names (e.g. if two modules 
  // export "simulation/state", create one stream with both)
  var streams = _.reduce(modules, function(streams, module){
    return _.merge(streams, module.streams, function(a,b){
      if(a && b){
        return a.merge(b);
      } else if(a) {
        return a;
      }
      return b;
      });
    }, {});
    
    // plug the messages into the master stream that is used for 
    // inter plugin communication
    _.each(streams, function(stream, key){
      messages.plug(stream.toEventStream().map(function(val){return {type:key,value: val};}));
    });
    return streams;
}

function applyDomModifications(Scene, domBase, modules){
  // filter invalid dom queries.
  var validDomElements = ["#ui","#content"];
  var domQuery = _.compose($, function(query){
    if(!_.contains(validDomElements,query)) query = "";
    return query;
  });
  
  _.each(modules, function(m){
    if(m.dom){
      domQuery(m.dom.element)["append"](m.dom.dom);
    }
  });
}

module.exports = {
  load: function(Scene, domBase, messages){    
    // load the modules defined in the plugins
    var modules = loadPlugins(Scene, messages);
    
    // initialize the resulting streams from the modules
    var streams = initStreams(Scene, modules, messages);
    
    applyDomModifications(Scene, domBase, modules);
    
    return {streams: streams};
  }
};
