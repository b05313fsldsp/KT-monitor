import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
//dc- echarts
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';

function GeneralLineChart({ state }) {
  const ageGenderUpdateTime = ageGenderData["DateUpdate"];

  const [logScale, setLogScale] = useState(false);

  let lineOption;
  lineOption = setGeneralLineOption(state.toUpperCase(), logScale);

  return (
    <div>
      <ReactEchartsCore
          theme={cm.getEChartsTheme()}
          echarts={echarts}
          option={lineOption}
          style={{height: "28vh"}} />
      <span className="key" style={{ marginTop: "0.5rem" }}>
        Logarithmic Scale:&nbsp;
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Button
            style={cm.getPillButtonColors(!logScale)}
            onClick={() => setLogScale(false)}
          >
            Off
          </Button>
          <Button
            style={cm.getPillButtonColors(logScale)}
            disableElevation={true}
            onClick={() => setLogScale(true)}
          >
            On
          </Button>
        </ButtonGroup>
        <a
          style={{
            display: "inline-flex",
            backgroundColor: "white",
            verticalAlign: "middle",
          }}
          className="badge badge-light"
          href="https://en.wikipedia.org/wiki/Logarithmic_scale"
          target="blank"
        >
          <svg
            className="bi bi-question-circle"
            width="1.1em"
            height="1.1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            backgroundcolor="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
              clipRule="evenodd"
            />
            <path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
          </svg>
          <div className="dataSource"></div>
        </a>
      </span>
      <span className="due" style={{ fontSize: "80%", padding: 0 }}>
        Time in AEST, Last Update: {ageGenderUpdateTime}
      </span>
    </div>
  );
}

export default GeneralLineChart;

