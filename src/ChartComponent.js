import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Chart from "./Chart";
import { getData } from "./utils";
import { TypeChooser } from "react-stockcharts/lib/helper";

const ChartComponent = () => {
  const [data, setData] = useState(null);

  const [selectedIndicators, setSelectedIndicators] = useState([]);
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        style={{
            padding: "10px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 4 columns
          gridTemplateRows: "repeat(2, auto)", // 2 rows, auto height
          gap: "10px", // Space between grid items
          marginBottom: "10px",
        }}
      >
        {indicators.map(({ id, name }) => (
          <div className="" key={id}>
            <input
              id={id}
              type="checkbox"
              checked={selectedIndicators.includes(id)}
              onChange={() =>
                handleCheckboxChange(id, selectedIndicators.includes(id))
              }
            />
            <label htmlFor={id} className="text-black text-sm">
              {id.toUpperCase()}
            </label>
          </div>
        ))}
      </div>
      <TypeChooser>{(type) => <Chart type={type} data={data} selectedIndicators={selectedIndicators} />}</TypeChooser>
    </div>
  );
};

export default ChartComponent;
// render(<ChartComponent />, document.getElementById("root"));