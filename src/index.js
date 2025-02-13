import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Chart from "./Chart";
import { TypeChooser } from "react-stockcharts/lib/helper";
import { timeParse } from "d3-time-format";

const ChartComponent = () => {
  const [chartData, setchartData] = useState(null);
  const data = [
    {
      "date": "2010-01-03T18:30:00.000Z",
      "open": 25.436282332605284,
      "high": 25.835021381744056,
      "low": 25.411360259406774,
      "close": 25.710416,
      "volume": 38409100,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-04T18:30:00.000Z",
      "open": 25.627344939513726,
      "high": 25.83502196495549,
      "low": 25.452895407434543,
      "close": 25.718722,
      "volume": 49749600,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-05T18:30:00.000Z",
      "open": 25.65226505944465,
      "high": 25.81840750861228,
      "low": 25.353210976925574,
      "close": 25.560888,
      "volume": 58182400,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-06T18:30:00.000Z",
      "open": 25.444587793771767,
      "high": 25.502739021094353,
      "low": 25.079077898061875,
      "close": 25.295062,
      "volume": 50559700,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-07T18:30:00.000Z",
      "open": 25.153841756996414,
      "high": 25.6522649488092,
      "low": 25.120612602739726,
      "close": 25.46951,
      "volume": 51197400,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-10T18:30:00.000Z",
      "open": 25.511044730573705,
      "high": 25.55258096597291,
      "low": 25.02092861663475,
      "close": 25.145534,
      "volume": 68754700,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-11T18:30:00.000Z",
      "open": 25.045848646491518,
      "high": 25.253525666777517,
      "low": 24.84647870701696,
      "close": 24.979392,
      "volume": 65912100,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-12T18:30:00.000Z",
      "open": 25.13722727051071,
      "high": 25.353211377924218,
      "low": 24.929550244151567,
      "close": 25.211991,
      "volume": 51863500,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-13T18:30:00.000Z",
      "open": 25.178761733851413,
      "high": 25.83502196495549,
      "low": 25.137227159471163,
      "close": 25.718722,
      "volume": 63228100,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-14T18:30:00.000Z",
      "open": 25.818406945612217,
      "high": 25.95132023748152,
      "low": 25.51104412745638,
      "close": 25.635652,
      "volume": 79913200,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-18T18:30:00.000Z",
      "open": 25.544274163987136,
      "high": 25.95132113440514,
      "low": 25.486124596784563,
      "close": 25.835022,
      "volume": 46575700,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-19T18:30:00.000Z",
      "open": 25.59411494568944,
      "high": 25.702108656795026,
      "low": 25.17876090842236,
      "close": 25.41136,
      "volume": 54849500,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-20T18:30:00.000Z",
      "open": 25.427975689088637,
      "high": 25.51935191837554,
      "low": 24.92124291902699,
      "close": 24.92955,
      "volume": 73086700,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-21T18:30:00.000Z",
      "open": 24.921242227943445,
      "high": 25.087384673504477,
      "low": 23.9576208617963,
      "close": 24.057305,
      "volume": 102004600,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-24T18:30:00.000Z",
      "open": 24.289904353342425,
      "high": 24.63880174829468,
      "low": 24.17360522169168,
      "close": 24.356361,
      "volume": 63373000,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-25T18:30:00.000Z",
      "open": 24.256677400199628,
      "high": 24.796636835593223,
      "low": 24.165298678305085,
      "close": 24.505889,
      "volume": 66639900,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-26T18:30:00.000Z",
      "open": 24.381282411526794,
      "high": 24.771715213346813,
      "low": 24.107148742163798,
      "close": 24.647109,
      "volume": 63949500,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-27T18:30:00.000Z",
      "open": 24.788329503429356,
      "high": 24.813251576935805,
      "low": 23.999155984106725,
      "close": 24.223448,
      "volume": 117513700,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-28T18:30:00.000Z",
      "open": 24.838171916252662,
      "high": 24.854786078069555,
      "low": 22.977385792760824,
      "close": 23.409354,
      "volume": 193888500,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-01-31T18:30:00.000Z",
      "open": 23.583802007377084,
      "high": 23.658566566701865,
      "low": 23.193370033086943,
      "close": 23.600417,
      "volume": 85931100,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-02-01T18:30:00.000Z",
      "open": 23.567188934614894,
      "high": 23.675180153730853,
      "low": 23.376124415817756,
      "close": 23.641951,
      "volume": 54413700,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-02-02T18:30:00.000Z",
      "open": 23.47581083464236,
      "high": 23.916086957012187,
      "low": 23.359512531703963,
      "close": 23.783172,
      "volume": 61397900,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
    {
      "date": "2010-02-03T18:30:00.000Z",
      "open": 23.575494533516057,
      "high": 23.67518033405172,
      "low": 23.101990926835022,
      "close": 23.126913,
      "volume": 77850000,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    },
   
  ]
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

  const parseDate = timeParse("%Y-%m-%d");
  

  useEffect(() => {
   const date =  parseDate("2010-10-7");
    console.log(date);
 
    const newData = data?.map((item, i) =>{
      return {
        date:parseDate(item?.date?.split("T")[0]),
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        volume: item.volume,
      }
    })
    setchartData(newData);

  }, []);

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  return (
   data.length > 0 ? <div> <div>
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
   <TypeChooser>{(type) => <Chart type={type} data={chartData} selectedIndicators={selectedIndicators} />}</TypeChooser>
 </div></div> : "no data"
  );
};

render(<ChartComponent />, document.getElementById("root"));

export default ChartComponent