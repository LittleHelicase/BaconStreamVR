
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
  var currentScene = null;
  options.chart.events.load = function(){
    // don't draw immediately this would result into
    // too much redrawing time. The chart animates the
    // insertion such that it still looks fluent even
    // with only 10 'redraws' (100ms each) per second.
    dataStream.bufferWithTimeOrCount(100,100)
      .onValue(function(vals){
          var val = vals[vals.length - 1];
          var state = val;
          var propID = 0;
          _.chain(currentScene.chart.datasets)
            .map(function(prop){
              var series = chart.series[propID];
              series.addPoint([
                  state[currentScene.chart.abscissa],
                  state[prop]
                ],false,false);
              propID++;
            });
        chart.redraw();
    });
  };
  sceneStream.onValue(function(scene){
    chart = new Highcharts.Chart(options);
    chart.setTitle({text:scene.name});
    currentScene = scene;
    clearSeries(chart.series);
    _.chain(scene.chart.datasets)
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
