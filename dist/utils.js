"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getData = void 0;
var _d3Dsv = require("d3-dsv");
var _d3TimeFormat = require("d3-time-format");
function parseData(parse) {
  return function (d) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;
    return d;
  };
}
const parseDate = (0, _d3TimeFormat.timeParse)("%Y-%m-%d");
const getData = async () => {
  const response = await fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv");
  const data = (0, _d3Dsv.tsvParse)(await response.text(), parseData(parseDate));
  return data; // Return the array directly
};
exports.getData = getData;