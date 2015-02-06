
var _ = require("lodash");
var $ = require("jquery");
var Highcharts = require("highcharts");
require("./highcharts-gray-theme.js");

var defaultOptions = {
  chart: {
    //animation: Highcharts.svg, // don't animate in old IE
    marginRight: 10
  },
  title: {
    text: "title"
  },
  xAxis: {
    title: {
      text: "Time"
    }
  },
  yAxis: {
    title: {
      text: "Value"
    }
  },
  tooltip: {
    formatter: function () {
      return '<b>' + this.series.name + '</b><br/>' +
      Highcharts.numberFormat(this.x, 2) + '<br/>' +
      Highcharts.numberFormat(this.y, 2);
    }
  },
  legend: {
    enabled: true
  }
}

function clearSeries(series){
  while(series.length > 0){
    series[0].remove(true);
  }
}

function createLineChart(sceneStream,dataStream, options){
  options = options || {};
  _.defaults(options, defaultOptions);
  options.series = [{
    name: 'Datensatz',
    data: []
  }];
  options.chart.events = options.chart.events || {};
  options.chart.renderTo = options.id;
  var chart;
  options.chart.events.load = function(){
    var time = 0;
    dataStream.bufferWithTimeOrCount(100,100)
      .onValue(function(vals){
        //_.each(vals, function(val){
          var val = vals[vals.length - 1];
          var state = val.currentState;
          var scene = val.scene;
          var propID = 0;
          _.chain(scene.simulation.properties)
            .reject(function(val){ return val == "time"})
            .map(function(prop){
              var series = chart.series[propID];
              series.addPoint([
                scene.simulation.query(state, "time"),
                scene.simulation.query(state, prop)],false,false);
              propID++;
            });
          //});
        chart.redraw();
    });
  };
  chart = new Highcharts.Chart(options);
  sceneStream.onValue(function(scene){
    clearSeries(chart.series);
    _.chain(scene.simulation.properties)
      .reject(function(val){ return val == "time"})
      .map(function(prop){
        chart.addSeries({name: prop, data: [], marker:{ enabled: false}});
      });
  });
}

module.exports = {
  lineChart: function(sceneStream,dataStream, options){
    createLineChart(sceneStream,dataStream,options);
  }
}
