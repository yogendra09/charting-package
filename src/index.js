import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Chart from "./Chart";
import { getData } from "./utils";
import { TypeChooser } from "react-stockcharts/lib/helper";

const ChartComponent = () => {
  const [data, setData] = useState(null);
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [isOpen, setIsOpen] = useState(false);



  const indicators = [
    { id: "rsi", name: "RSI: Relative Strength Index" },
    { id: "sma20", name: "SMA: Simple Moving Average" },
    { id: "ema", name: "EMA: Exponential Moving Average" },
    { id: "atr", name: "ATR: Average True Range" },
    { id: "macd", name: "MACD: Moving Average Convergence Divergence" },
    { id: "bollingerBands", name: "Bollinger Bands" },
    { id: "pivotPoints", name: "Pivot Points" },
    { id: "supertrend", name: "Supertrend" },
    { id: "anchoredVWAP", name: "Anchored VWAP" },
    { id: "vwap", name: "VWAP: Volume Weighted Average Price" },
    { id: "adx", name: "ADX: Average Directional Index" },
    { id: "cci", name: "CCI: Commodity Channel Index" },
    { id: "obv", name: "OBV: On-Balance Volume" },
    { id: "stochasticOscillator", name: "Stochastic Oscillator" },
    { id: "williamsR", name: "Williams %R" },
    { id: "roc", name: "ROC: Rate of Change" },
    { id: "momentum", name: "Momentum Indicator" },
  ];

  const handleCheckboxChange = (id, isChecked) => {
    setSelectedIndicators((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    getData().then(setData).catch(console.error);
  }, []);

  if (!data) {
    return (<div>Loading...</div>);
  }

  return (
    <div>
      <div style={{ position: "relative", width: "400px",marginBottom: "20px" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "10px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Select Indicators
      </button>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            background: "white",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            zIndex: 10,
          }}
        >
          {indicators.map(({ id, name }) => (
            <div key={id} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <input
                id={id}
                type="checkbox"
                checked={selectedIndicators.includes(id)}
                onChange={() => handleCheckboxChange(id, selectedIndicators.includes(id))}
                style={{ marginRight: "5px" }}
              />
              <label htmlFor={id} style={{ fontSize: "14px", color: "#333" }}>
                {name || id.toUpperCase()}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
      <TypeChooser>{(type) => <Chart type={type} data={data} selectedIndicators={selectedIndicators} />}</TypeChooser>
    </div>
  );
};

render(<ChartComponent />, document.getElementById("root"));

export default ChartComponent;