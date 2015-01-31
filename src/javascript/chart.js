
var _ = require("lodash");
var $ = require("jquery");
var Highcharts = require("highcharts");

var defaultOptions = {
  chart: {
    type: 'spline',
    animation: Highcharts.svg, // don't animate in old IE
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
    enabled: false
  }
}

function createLineChart(data, options){
  if(_.isObject(data) && _.isNull(options)){
    options = data;
    data = null;
  }
  _.defaults(options, defaultOptions);
  data = data || [];
  options.series = [{
    name: 'Datensatz',
    data: data
  }];
  options.chart.renderTo = options.id;
  new Highcharts.Chart(options);  
}

module.exports = {
  lineChart: function(data, options){
    createLineChart(data,options);
  }
}
