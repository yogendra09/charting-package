import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { ChartCanvas, Chart } from "react-stockcharts";
import { RSITooltip } from "react-stockcharts/lib/tooltip";
import { bollingerBand, rsi, sma } from "react-stockcharts/lib/indicator";

import {
  BarSeries,
  StraightLine,
  CandlestickSeries,
  LineSeries,
  StochasticSeries,
  BollingerSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  EdgeIndicator,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
  OHLCTooltip,
  MovingAverageTooltip,
  StochasticTooltip,
} from "react-stockcharts/lib/tooltip";
import { ema, stochasticOscillator } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import { atr } from "react-stockcharts/lib/indicator";

const stoAppearance = {
  stroke: Object.assign({}, StochasticSeries.defaultProps.stroke),
};

const CandleStickChartWithFullStochasticsIndicator = ({
  type = "svg",
  data: initialData,
  width,
  ratio,
  selectedIndicators,
}) => {
  const height = 750;
  const margin = { left: 70, right: 70, top: 20, bottom: 30 };

  const gridHeight = height - margin.top - margin.bottom;
  const gridWidth = width - margin.left - margin.right;

  const showGrid = true;
  const yGrid = showGrid
    ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.1 }
    : {};
  const xGrid = showGrid
    ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.1 }
    : {};

  const ema20 = ema()
    .id(0)
    .options({ windowSize: 20 })
    .merge((d, c) => {
      d.ema20 = c;
    })
    .accessor((d) => d.ema20);

  const ema50 = ema()
    .id(2)
    .options({ windowSize: 50 })
    .merge((d, c) => {
      d.ema50 = c;
    })
    .accessor((d) => d.ema50);

  const sma20 = sma()
    .options({ windowSize: 20 })
    .merge((d, c) => { d.sma20 = c; })
    .accessor(d => d.sma20);

  const slowSTO = stochasticOscillator()
    .options({ windowSize: 14, kWindowSize: 3 })
    .merge((d, c) => {
      d.slowSTO = c;
    })
    .accessor((d) => d.slowSTO);

  const fastSTO = stochasticOscillator()
    .options({ windowSize: 14, kWindowSize: 1 })
    .merge((d, c) => {
      d.fastSTO = c;
    })
    .accessor((d) => d.fastSTO);

  const fullSTO = stochasticOscillator()
    .options({ windowSize: 14, kWindowSize: 3, dWindowSize: 4 })
    .merge((d, c) => {
      d.fullSTO = c;
    })
    .accessor((d) => d.fullSTO);

  const rsiCalculator = rsi()
    .options({ windowSize: 14 })
    .merge((d, c) => {
      d.rsi = c;
    })
    .accessor((d) => d.rsi);

  const bb = bollingerBand()
    .merge((d, c) => {
      d.bb = c;
    })
    .accessor((d) => d.bb);

  const bbAppearance = {
    stroke: {
      top: "#964B00",
      middle: "#FF6600",
      bottom: "#964B00",
    },
    fill: "#4682B4",
  };
  const atrCalculator = atr()
  .options({ windowSize: 14 })  // Corrected windowSize configuration
  .merge((d, c) => {
    d.atr = c;
  })
  .accessor((d) => d.atr);  // accessor function for ATR data


  const calculatedData = sma20(bb(ema20(ema50(slowSTO(fastSTO(fullSTO(initialData)))))));
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d) => d.date
  );

  const { data, xScale, xAccessor, displayXAccessor } =
    xScaleProvider(calculatedData);
   
  const start = xAccessor(last(data));
  const end = xAccessor(data[Math.max(0, data.length - 150)]);
  const xExtents = [start, end];

  useEffect(() => {
    console.log(selectedIndicators);
  }, [selectedIndicators]);

  const belowChart = [
    {
      id: "atr",
      indicator: "slow sto",
      component: (
        <Chart
          id={3}
          yExtents={[0, 100]}
          height={125}
          origin={(w, h) => [0, h - 375]}
          padding={{ top: 10, bottom: 10 }}
        >
          <XAxis
            axisAt="bottom"
            orient="bottom"
            showTicks={false}
            outerTickSize={0}
          />
          <YAxis axisAt="right" orient="right" tickValues={[20, 50, 80]} />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />
          <StochasticSeries yAccessor={(d) => d.fastSTO} {...stoAppearance} />
          <StochasticTooltip
            origin={[-38, 15]}
            yAccessor={(d) => d.slowSTO}
            options={slowSTO.options()}
            appearance={stoAppearance}
            label="Slow STO"
          />
        </Chart>
      ),
    },
    {
      id: "macd",
      indicator: "fast sto",
      component: (
        <Chart
          id={4}
          yExtents={[0, 100]}
          height={125}
          origin={(w, h) => [0, h - 250]}
          padding={{ top: 10, bottom: 10 }}
        >
          <XAxis
            axisAt="bottom"
            orient="bottom"
            showTicks={false}
            outerTickSize={0}
          />
          <YAxis axisAt="right" orient="right" tickValues={[20, 50, 80]} />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />
          <StochasticSeries yAccessor={(d) => d.slowSTO} {...stoAppearance} />
          <StochasticTooltip
            origin={[-38, 15]}
            yAccessor={(d) => d.fastSTO}
            options={fastSTO.options()}
            appearance={stoAppearance}
            label="Fast STO"
          />
        </Chart>
      ),
    },
    {
      id: "rsi",
      indicator: "rsi",
      component: (
        <Chart
          id={6}
          yExtents={[0, 100]}
          height={125}
          origin={(w, h) => [0, h - 375]}
          padding={{ top: 10, bottom: 10 }}
        >
          <XAxis axisAt="bottom" orient="bottom" {...xGrid} />
          <YAxis axisAt="right" orient="right" tickValues={[30, 50, 70]} />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />
          <LineSeries yAccessor={(d) => d.rsi || null} stroke="blue" />
          <RSITooltip
            origin={[-38, 15]}
            yAccessor={(d) => d.rsi}
            options={rsiCalculator.options()}
            label="RSI"
          />
        </Chart>
      ),
    },
  ];

  const mainChart = [
    {
      id: "ema",
      indicator: "EMA",
      cordinate: (
        <CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />
      ),
      component: (
        <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()} />
      ),
    },
    {
      id: "ema50",
      indicator: "EMA50",
      cordinate: (
        <CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()} />
      ),
      component: (
        <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()} />
      ),
    },
    {
      id: "sma20",
      indicator: "SMA20",
      cordinate: (
        <CurrentCoordinate yAccessor={sma20.accessor()} fill={sma20.stroke()} />
      ),
      component: (
        <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()} />
      ),
    },
    {
      id: "bollingerBands",
      indicator: "Bollinger Bands",
      cordinate: (
        <CurrentCoordinate
          yAccessor={bb.accessor().middle}
          fill={bbAppearance.stroke.middle}
        />
      ),
      component: <BollingerSeries yAccessor={(d) => d.bb} {...bbAppearance} />,
    },

  ];

  return (
    <ChartCanvas
      height={750}
      width={width}
      ratio={ratio}
      margin={margin}
      type={type}
      seriesName="MSFT"
      data={data}
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xExtents={xExtents}
    >
      {belowChart.map((chart, index) =>
        selectedIndicators.indexOf(chart.id) !== -1 ? chart.component : null
      )}

      <Chart
        id={1}
        height={325}
        yExtents={(d) => [d.high, d.low]}
        padding={{ top: 10, bottom: 20 }}
      >
        <YAxis axisAt="right" orient="right" ticks={5} {...yGrid} />
        <XAxis
          axisAt="bottom"
          orient="bottom"
          showTicks={false}
          outerTickSize={0}
        />

        <MouseCoordinateY
          at="right"
          orient="right"
          displayFormat={format(".2f")}
        />

        <CandlestickSeries />

        {/* <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()} />
        <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()} />

        <CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />
        <CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()} /> */}

        {mainChart.map((line, index) =>
          selectedIndicators.indexOf(line.id) !== -1
            ? (line.cordinate, line.component)
            : null
        )}

        <EdgeIndicator
          itemType="last"
          orient="right"
          edgeAt="right"
          yAccessor={(d) => d.close}
          fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
        />

        <StraightLine type="vertical" xValue={608} />
        <StraightLine type="vertical" xValue={558} strokeDasharray="Dot" />
        <StraightLine type="vertical" xValue={578} strokeDasharray="LongDash" />

        <OHLCTooltip origin={[-40, -10]} />
        <MovingAverageTooltip
          onClick={(e) => console.log(e)}
          origin={[-38, 5]}
          options={[
            {
              yAccessor: ema20.accessor(),
              type: ema20.type(),
              stroke: ema20.stroke(),
              windowSize: ema20.options().windowSize,
            },
            {
              yAccessor: ema50.accessor(),
              type: ema50.type(),
              stroke: ema50.stroke(),
              windowSize: ema50.options().windowSize,
            },
          ]}
        />
      </Chart>

      <Chart
        id={2}
        yExtents={(d) => d.volume}
        height={100}
        origin={(w, h) => [0, h - 475]}
      >
        <YAxis
          axisAt="left"
          orient="left"
          ticks={5}
          tickFormat={format(".2s")}
        />
        <MouseCoordinateY
          at="left"
          orient="left"
          displayFormat={format(".4s")}
        />
        <BarSeries
          yAccessor={(d) => d.volume}
          fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
        />
      </Chart>

      <Chart
        id={5}
        yExtents={[0, 100]}
        height={125}
        origin={(w, h) => [0, h - 125]}
        padding={{ top: 10, bottom: 10 }}
      >
        <XAxis axisAt="bottom" orient="bottom" {...xGrid} />
        <YAxis axisAt="right" orient="right" tickValues={[20, 50, 80]} />
        <MouseCoordinateX
          at="bottom"
          orient="bottom"
          displayFormat={timeFormat("%Y-%m-%d")}
        />
        <MouseCoordinateY
          at="right"
          orient="right"
          displayFormat={format(".2f")}
        />
        <StochasticSeries yAccessor={(d) => d.fullSTO} {...stoAppearance} />
        <StochasticTooltip
          origin={[-38, 15]}
          yAccessor={(d) => d.fullSTO}
          options={fullSTO.options()}
          appearance={stoAppearance}
          label="Full STO"
        />
      </Chart>

      <CrossHairCursor />
    </ChartCanvas>
  );
};

CandleStickChartWithFullStochasticsIndicator.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartWithFullStochasticsIndicator.defaultProps = {
  type: "svg",
};

export default fitWidth(CandleStickChartWithFullStochasticsIndicator);