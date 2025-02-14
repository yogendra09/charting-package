"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _Chart = _interopRequireDefault(require("./Chart"));
var _utils = require("./utils");
var _helper = require("react-stockcharts/lib/helper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ChartComponent = () => {
  const [data, setData] = (0, _react.useState)(null);
  const [selectedIndicators, setSelectedIndicators] = (0, _react.useState)([]);
  const [isOpen, setIsOpen] = (0, _react.useState)(false);
  const indicators = [{
    id: "rsi",
    name: "RSI: Relative Strength Index"
  }, {
    id: "sma20",
    name: "SMA: Simple Moving Average"
  }, {
    id: "ema",
    name: "EMA: Exponential Moving Average"
  }, {
    id: "atr",
    name: "ATR: Average True Range"
  }, {
    id: "macd",
    name: "MACD: Moving Average Convergence Divergence"
  }, {
    id: "bollingerBands",
    name: "Bollinger Bands"
  }, {
    id: "pivotPoints",
    name: "Pivot Points"
  }, {
    id: "supertrend",
    name: "Supertrend"
  }, {
    id: "anchoredVWAP",
    name: "Anchored VWAP"
  }, {
    id: "vwap",
    name: "VWAP: Volume Weighted Average Price"
  }, {
    id: "adx",
    name: "ADX: Average Directional Index"
  }, {
    id: "cci",
    name: "CCI: Commodity Channel Index"
  }, {
    id: "obv",
    name: "OBV: On-Balance Volume"
  }, {
    id: "stochasticOscillator",
    name: "Stochastic Oscillator"
  }, {
    id: "williamsR",
    name: "Williams %R"
  }, {
    id: "roc",
    name: "ROC: Rate of Change"
  }, {
    id: "momentum",
    name: "Momentum Indicator"
  }];
  const handleCheckboxChange = (id, isChecked) => {
    setSelectedIndicators(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };
  (0, _react.useEffect)(() => {
    (0, _utils.getData)().then(setData).catch(console.error);
  }, []);
  if (!data) {
    return /*#__PURE__*/_react.default.createElement("div", null, "Loading...");
  }
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "relative",
      width: "400px",
      marginBottom: "20px"
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => setIsOpen(!isOpen),
    style: {
      width: "100%",
      padding: "10px",
      background: "black",
      color: "white",
      border: "none",
      cursor: "pointer"
    }
  }, "Select Indicators"), isOpen && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "absolute",
      top: "100%",
      left: 0,
      width: "100%",
      background: "white",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "10px",
      zIndex: 10
    }
  }, indicators.map(_ref => {
    let {
      id,
      name
    } = _ref;
    return /*#__PURE__*/_react.default.createElement("div", {
      key: id,
      style: {
        display: "flex",
        alignItems: "center",
        marginBottom: "5px"
      }
    }, /*#__PURE__*/_react.default.createElement("input", {
      id: id,
      type: "checkbox",
      checked: selectedIndicators.includes(id),
      onChange: () => handleCheckboxChange(id, selectedIndicators.includes(id)),
      style: {
        marginRight: "5px"
      }
    }), /*#__PURE__*/_react.default.createElement("label", {
      htmlFor: id,
      style: {
        fontSize: "14px",
        color: "#333"
      }
    }, name || id.toUpperCase()));
  }))), /*#__PURE__*/_react.default.createElement(_helper.TypeChooser, null, type => /*#__PURE__*/_react.default.createElement(_Chart.default, {
    type: type,
    data: data,
    selectedIndicators: selectedIndicators
  })));
};
(0, _reactDom.render)(/*#__PURE__*/_react.default.createElement(ChartComponent, null), document.getElementById("root"));
var _default = exports.default = ChartComponent;