"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _d3Format = require("d3-format");
var _d3TimeFormat = require("d3-time-format");
var _reactStockcharts = require("react-stockcharts");
var _tooltip = require("react-stockcharts/lib/tooltip");
var _indicator = require("react-stockcharts/lib/indicator");
var _series = require("react-stockcharts/lib/series");
var _axes = require("react-stockcharts/lib/axes");
var _coordinates = require("react-stockcharts/lib/coordinates");
var _scale = require("react-stockcharts/lib/scale");
var _helper = require("react-stockcharts/lib/helper");
var _utils = require("react-stockcharts/lib/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const stoAppearance = {
  stroke: Object.assign({}, _series.StochasticSeries.defaultProps.stroke)
};
const CandleStickChartWithFullStochasticsIndicator = _ref => {
  let {
    type = "svg",
    data: initialData,
    width,
    ratio,
    selectedIndicators
  } = _ref;
  const height = 750;
  const margin = {
    left: 70,
    right: 70,
    top: 20,
    bottom: 30
  };
  const gridHeight = height - margin.top - margin.bottom;
  const gridWidth = width - margin.left - margin.right;
  const showGrid = true;
  const yGrid = showGrid ? {
    innerTickSize: -1 * gridWidth,
    tickStrokeOpacity: 0.1
  } : {};
  const xGrid = showGrid ? {
    innerTickSize: -1 * gridHeight,
    tickStrokeOpacity: 0.1
  } : {};
  const ema20 = (0, _indicator.ema)().id(0).options({
    windowSize: 20
  }).merge((d, c) => {
    d.ema20 = c;
  }).accessor(d => d.ema20);
  const ema50 = (0, _indicator.ema)().id(2).options({
    windowSize: 50
  }).merge((d, c) => {
    d.ema50 = c;
  }).accessor(d => d.ema50);
  const sma20 = (0, _indicator.sma)().options({
    windowSize: 20
  }).merge((d, c) => {
    d.sma20 = c;
  }).accessor(d => d.sma20);
  const slowSTO = (0, _indicator.stochasticOscillator)().options({
    windowSize: 14,
    kWindowSize: 3
  }).merge((d, c) => {
    d.slowSTO = c;
  }).accessor(d => d.slowSTO);
  const fastSTO = (0, _indicator.stochasticOscillator)().options({
    windowSize: 14,
    kWindowSize: 1
  }).merge((d, c) => {
    d.fastSTO = c;
  }).accessor(d => d.fastSTO);
  const fullSTO = (0, _indicator.stochasticOscillator)().options({
    windowSize: 14,
    kWindowSize: 3,
    dWindowSize: 4
  }).merge((d, c) => {
    d.fullSTO = c;
  }).accessor(d => d.fullSTO);
  const rsiCalculator = (0, _indicator.rsi)().options({
    windowSize: 14
  }).merge((d, c) => {
    d.rsi = c;
  }).accessor(d => d.rsi);
  const bb = (0, _indicator.bollingerBand)().merge((d, c) => {
    d.bb = c;
  }).accessor(d => d.bb);
  const macdCalculator = (0, _indicator.macd)().options({
    fast: 12,
    slow: 26,
    signal: 9
  }).merge((d, c) => {
    d.macd = c;
  }).accessor(d => d.macd);
  const atrCalculator = (0, _indicator.atr)().merge((d, c) => {
    d.atr = c;
  }).accessor(d => d.atr);
  const bbAppearance = {
    stroke: {
      top: "#964B00",
      middle: "#FF6600",
      bottom: "#964B00"
    },
    fill: "#4682B4"
  };
  const calculatedData = macdCalculator(atrCalculator(rsiCalculator(sma20(bb(ema20(ema50(slowSTO(fastSTO(fullSTO(initialData))))))))));
  const xScaleProvider = _scale.discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
  const {
    data,
    xScale,
    xAccessor,
    displayXAccessor
  } = xScaleProvider(calculatedData);
  const start = xAccessor((0, _utils.last)(data));
  const end = xAccessor(data[Math.max(0, data.length - 150)]);
  const xExtents = [start, end];
  (0, _react.useEffect)(() => {
    console.log(selectedIndicators);
  }, [selectedIndicators]);
  const belowChart = [{
    id: "atr",
    indicator: "ATR",
    component: /*#__PURE__*/_react.default.createElement(_reactStockcharts.Chart, {
      id: 3,
      yExtents: [0, 100],
      height: 125,
      origin: (w, h) => [0, h - 375],
      padding: {
        top: 10,
        bottom: 10
      }
    }, /*#__PURE__*/_react.default.createElement(_axes.XAxis, {
      axisAt: "bottom",
      orient: "bottom",
      showTicks: false,
      outerTickSize: 0
    }), /*#__PURE__*/_react.default.createElement(_axes.YAxis, {
      axisAt: "right",
      orient: "right",
      tickValues: [20, 50, 80]
    }), /*#__PURE__*/_react.default.createElement(_coordinates.MouseCoordinateY, {
      at: "right",
      orient: "right",
      displayFormat: (0, _d3Format.format)(".2f")
    }), /*#__PURE__*/_react.default.createElement(_series.LineSeries, {
      yAccessor: d => d.atr || null,
      stroke: "blue"
    }), /*#__PURE__*/_react.default.createElement(_tooltip.StochasticTooltip, {
      origin: [-38, 15],
      yAccessor: d => d.atrCalculator,
      options: atrCalculator.options(),
      appearance: stoAppearance,
      label: "Slow STO"
    }))
  }, {
    id: "macd",
    indicator: "MACD",
    component: /*#__PURE__*/_react.default.createElement(_reactStockcharts.Chart, {
      id: 4,
      yExtents: [0, 100],
      height: 125,
      origin: (w, h) => [0, h - 250],
      padding: {
        top: 10,
        bottom: 10
      }
    }, /*#__PURE__*/_react.default.createElement(_axes.XAxis, {
      axisAt: "bottom",
      orient: "bottom",
      showTicks: false,
      outerTickSize: 0
    }), /*#__PURE__*/_react.default.createElement(_axes.YAxis, {
      axisAt: "right",
      orient: "right",
      tickValues: [20, 50, 80]
    }), /*#__PURE__*/_react.default.createElement(_coordinates.MouseCoordinateY, {
      at: "right",
      orient: "right",
      displayFormat: (0, _d3Format.format)(".2f")
    }), /*#__PURE__*/_react.default.createElement(_series.StochasticSeries, _extends({
      yAccessor: d => d.slowSTO
    }, stoAppearance)), /*#__PURE__*/_react.default.createElement(_tooltip.StochasticTooltip, {
      origin: [-38, 15],
      yAccessor: d => d.fastSTO,
      options: fastSTO.options(),
      appearance: stoAppearance,
      label: "Fast STO"
    }))
  }, {
    id: "rsi",
    indicator: "rsi",
    component: /*#__PURE__*/_react.default.createElement(_reactStockcharts.Chart, {
      id: 6,
      yExtents: [0, 100],
      height: 125,
      origin: (w, h) => [0, h - 375],
      padding: {
        top: 10,
        bottom: 10
      }
    }, /*#__PURE__*/_react.default.createElement(_axes.XAxis, _extends({
      axisAt: "bottom",
      orient: "bottom"
    }, xGrid)), /*#__PURE__*/_react.default.createElement(_axes.YAxis, {
      axisAt: "right",
      orient: "right",
      tickValues: [30, 50, 70]
    }), /*#__PURE__*/_react.default.createElement(_coordinates.MouseCoordinateX, {
      at: "bottom",
      orient: "bottom",
      displayFormat: (0, _d3TimeFormat.timeFormat)("%Y-%m-%d")
    }), /*#__PURE__*/_react.default.createElement(_coordinates.MouseCoordinateY, {
      at: "right",
      orient: "right",
      displayFormat: (0, _d3Format.format)(".2f")
    }), /*#__PURE__*/_react.default.createElement(_series.LineSeries, {
      yAccessor: d => d.rsi || null,
      stroke: "blue"
    }), /*#__PURE__*/_react.default.createElement(_tooltip.RSITooltip, {
      origin: [-38, 15],
      yAccessor: d => d.rsi,
      options: rsiCalculator.options(),
      label: "RSI"
    }))
  }];
  const mainChart = [{
    id: "ema",
    indicator: "EMA",
    cordinate: /*#__PURE__*/_react.default.createElement(_coordinates.CurrentCoordinate, {
      yAccessor: ema20.accessor(),
      fill: ema20.stroke()
    }),
    component: /*#__PURE__*/_react.default.createElement(_series.LineSeries, {
      yAccessor: ema20.accessor(),
      stroke: ema20.stroke()
    })
  }, {
    id: "ema50",
    indicator: "EMA50",
    cordinate: /*#__PURE__*/_react.default.createElement(_coordinates.CurrentCoordinate, {
      yAccessor: ema50.accessor(),
      fill: ema50.stroke()
    }),
    component: /*#__PURE__*/_react.default.createElement(_series.LineSeries, {
      yAccessor: ema50.accessor(),
      stroke: ema50.stroke()
    })
  }, {
    id: "sma20",
    indicator: "SMA20",
    cordinate: /*#__PURE__*/_react.default.createElement(_coordinates.CurrentCoordinate, {
      yAccessor: sma20.accessor(),
      fill: sma20.stroke()
    }),
    component: /*#__PURE__*/_react.default.createElement(_series.LineSeries, {
      yAccessor: ema50.accessor(),
      stroke: ema50.stroke()
    })
  }, {
    id: "bollingerBands",
    indicator: "Bollinger Bands",
    cordinate: /*#__PURE__*/_react.default.createElement(_coordinates.CurrentCoordinate, {
      yAccessor: bb.accessor().middle,
      fill: bbAppearance.stroke.middle
    }),
    component: /*#__PURE__*/_react.default.createElement(_series.BollingerSeries, _extends({
      yAccessor: d => d.bb
    }, bbAppearance))
  }];
  return /*#__PURE__*/_react.default.createElement(_reactStockcharts.ChartCanvas, {
    height: 750,
    width: width,
    ratio: ratio,
    margin: margin,
    type: type,
    seriesName: "MSFT",
    data: data,
    xScale: xScale,
    xAccessor: xAccessor,
    displayXAccessor: displayXAccessor,
    xExtents: xExtents
  }, belowChart.map((chart, index) => selectedIndicators.indexOf(chart.id) !== -1 ? chart.component : null), /*#__PURE__*/_react.default.createElement(_reactStockcharts.Chart, {
    id: 1,
    height: 325,
    yExtents: d => [d.high, d.low],
    padding: {
      top: 10,
      bottom: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_axes.YAxis, _extends({
    axisAt: "right",
    orient: "right",
    ticks: 5
  }, yGrid)), /*#__PURE__*/_react.default.createElement(_axes.XAxis, {
    axisAt: "bottom",
    orient: "bottom",
    showTicks: false,
    outerTickSize: 0
  }), /*#__PURE__*/_react.default.createElement(_coordinates.MouseCoordinateY, {
    at: "right",
    orient: "right",
    displayFormat: (0, _d3Format.format)(".2f")
  }), /*#__PURE__*/_react.default.createElement(_series.CandlestickSeries, null), mainChart.map((line, index) => selectedIndicators.indexOf(line.id) !== -1 ? (line.cordinate, line.component) : null), /*#__PURE__*/_react.default.createElement(_coordinates.EdgeIndicator, {
    itemType: "last",
    orient: "right",
    edgeAt: "right",
    yAccessor: d => d.close,
    fill: d => d.close > d.open ? "#6BA583" : "#FF0000"
  }), /*#__PURE__*/_react.default.createElement(_series.StraightLine, {
    type: "vertical",
    xValue: 608
  }), /*#__PURE__*/_react.default.createElement(_series.StraightLine, {
    type: "vertical",
    xValue: 558,
    strokeDasharray: "Dot"
  }), /*#__PURE__*/_react.default.createElement(_series.StraightLine, {
    type: "vertical",
    xValue: 578,
    strokeDasharray: "LongDash"
  }), /*#__PURE__*/_react.default.createElement(_tooltip.OHLCTooltip, {
    origin: [-40, -10]
  }), /*#__PURE__*/_react.default.createElement(_tooltip.MovingAverageTooltip, {
    onClick: e => console.log(e),
    origin: [-38, 5],
    options: [{
      yAccessor: ema20.accessor(),
      type: ema20.type(),
      stroke: ema20.stroke(),
      windowSize: ema20.options().windowSize
    }, {
      yAccessor: ema50.accessor(),
      type: ema50.type(),
      stroke: ema50.stroke(),
      windowSize: ema50.options().windowSize
    }]
  })), /*#__PURE__*/_react.default.createElement(_reactStockcharts.Chart, {
    id: 2,
    yExtents: d => d.volume,
    height: 100,
    origin: (w, h) => [0, h - 475]
  }, /*#__PURE__*/_react.default.createElement(_axes.YAxis, {
    axisAt: "left",
    orient: "left",
    ticks: 5,
    tickFormat: (0, _d3Format.format)(".2s")
  }), /*#__PURE__*/_react.default.createElement(_coordinates.MouseCoordinateY, {
    at: "left",
    orient: "left",
    displayFormat: (0, _d3Format.format)(".4s")
  }), /*#__PURE__*/_react.default.createElement(_series.BarSeries, {
    yAccessor: d => d.volume,
    fill: d => d.close > d.open ? "#6BA583" : "#FF0000"
  })), /*#__PURE__*/_react.default.createElement(_reactStockcharts.Chart, {
    id: 5,
    yExtents: [0, 100],
    height: 125,
    origin: (w, h) => [0, h - 125],
    padding: {
      top: 10,
      bottom: 10
    }
  }, /*#__PURE__*/_react.default.createElement(_axes.XAxis, _extends({
    axisAt: "bottom",
    orient: "bottom"
  }, xGrid)), /*#__PURE__*/_react.default.createElement(_axes.YAxis, {
    axisAt: "right",
    orient: "right",
    tickValues: [20, 50, 80]
  }), /*#__PURE__*/_react.default.createElement(_coordinates.MouseCoordinateX, {
    at: "bottom",
    orient: "bottom",
    displayFormat: (0, _d3TimeFormat.timeFormat)("%Y-%m-%d")
  }), /*#__PURE__*/_react.default.createElement(_coordinates.MouseCoordinateY, {
    at: "right",
    orient: "right",
    displayFormat: (0, _d3Format.format)(".2f")
  }), /*#__PURE__*/_react.default.createElement(_series.StochasticSeries, _extends({
    yAccessor: d => d.fullSTO
  }, stoAppearance)), /*#__PURE__*/_react.default.createElement(_tooltip.StochasticTooltip, {
    origin: [-38, 15],
    yAccessor: d => d.fullSTO,
    options: fullSTO.options(),
    appearance: stoAppearance,
    label: "Full STO"
  })), /*#__PURE__*/_react.default.createElement(_coordinates.CrossHairCursor, null));
};
CandleStickChartWithFullStochasticsIndicator.propTypes = {
  data: _propTypes.default.array.isRequired,
  width: _propTypes.default.number.isRequired,
  ratio: _propTypes.default.number.isRequired,
  type: _propTypes.default.oneOf(["svg", "hybrid"]).isRequired
};
CandleStickChartWithFullStochasticsIndicator.defaultProps = {
  type: "svg"
};
var _default = exports.default = (0, _helper.fitWidth)(CandleStickChartWithFullStochasticsIndicator);