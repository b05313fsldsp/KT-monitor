import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
//dc- echarts
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

/*
const buildChartData3 = (data, casesType = "cases") => {
  let chartData = [];
  const obj = JSON.parse(JSON.stringify(data));

  for (var i=0; i<3; i++) {
      let newDataPoint = {
        x: i,
        y: obj.cases 
      };
      chartData.push(newDataPoint);
  }

  return chartData;
};


const buildChartData2 = (data, casesType = "title") => {
  let chartData = [];
  const obj = JSON.parse(JSON.stringify(data));

  // console.log(obj);
  //console.log(obj.title);


  for (var i=0; i<3; i++) {
      let newDataPoint = {
        x: i,
        y: obj.title // dc- to show SPN1761??
      };
      chartData.push(newDataPoint);
  }

  return chartData;
};

*/

const buildChartData = (data, casesType = "cases") => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};


/*
  const response = await fetch("http://localhost:8081/api/tqs");

*/

function StateChartline({ casesType }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      // await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      // await fetch("http://localhost:8081/api/tqs")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          // console.log(chartData);
          console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default StateChartline;
