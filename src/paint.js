import $ from 'jquery';
import d3 from 'd3';
import nv from 'nvd3';
import { convertToUnixTime } from './utilities';
import 'nvd3/build/nv.d3.min.css';

function viz (data, id, layout, $element) {
  var chartType = layout.chartType;

  // Map the hypercube data to required format, and convert Qlik date to Unix time
  var dataNVD3 = data.map(function(row){
    return {
      "date": convertToUnixTime(row[0].qNum),
      "open": row[1].qNum,
      "high": row[2].qNum,
      "low": row[3].qNum,
      "close": row[4].qNum
    };
  });

  // Transform data set into required format for NVD3
  dataNVD3 = d3.nest()
    .key(function(d) { return 'All'; })
    .entries(dataNVD3);

  d3.select("#"+id)
    .append("svg:svg");

  var chart;

  nv.addGraph(function() {
    chart = (chartType == 'ohlc' ? nv.models.ohlcBarChart() : nv.models.candlestickBarChart())
      .x(function(d) { return d['date']; })
      .y(function(d) { return d['close']; })
      .duration(250)
      .margin({ left: 75, bottom: 50, right: 30 });

    // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
    chart.xAxis
      .axisLabel("Dates")
      .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)); });

    chart.yAxis
      .axisLabel('Stock Price')
      .tickFormat(function(d,i){ return d3.format(',.2f')(d); });

    // call the chart
    d3.select('#'+id+' svg')
      .datum(dataNVD3)
      .transition().duration(500)
      .call(chart);
    nv.utils.windowResize(chart.update);
    return chart;
  });
}

function paint ($element, layout) {
  var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
  var data = qMatrix;

  var width = $element.width();
  var height = $element.height();
  var id = "container_" + layout.qInfo.qId;

  $element.empty().append($('<div />')
    .attr({ "id": id, "class": "qv-object-nvd3-OHLC" })
    .css({ height: height, width: width }));

  // Call the viz function
  viz(data, id, layout, $element);
}

export default paint;
