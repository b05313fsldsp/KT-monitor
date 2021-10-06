import React, { useState, useEffect } from "react";
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
          format: "HH:mm",
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


/* dc- No good way xd
const buildChartData = (data) => {
  let chartData = [];
  let lastDataPoint;
  const obj = JSON.stringify(data)
  console.log(obj[0], obj[1], obj[2], obj[3], obj[4], obj[5]);

  for (let tqs in data) {

    // console.log(obj[tqs]);
    // console.log(data[1]);
     let newDataPoint = {
        x: tqs[3], //time,
        y: tqs[4], //SPN1761,
      };
      chartData.push(newDataPoint);
    }
  
  return chartData;
};
*/

const buildChartData = (data) => {
  let chartData = [];

  for (let tqs in data) {

     let newDataPoint = {
        x: data[tqs].TTIMESTAMP, //time : 4,
        y: data[tqs].SPN1761, //SPN1761 : 3,
      };
      chartData.push(newDataPoint);
    }
  
  return chartData;
};




/*
const buildChartData = (data, casesType = "SPN1761") => {
  let chartData = [];
  let lastDataPoint;

  console.log(data);

  for (let tqs in data.SPN1761) {
     // SPN1761 = data[tqs][3]; //dc- fail ??
     console.log(data);
     // console.log(SPN1761);

     let newDataPoint = {
        x: tqs,
        y: data[casesType][tqs],
      };
      chartData.push(newDataPoint);
    }

  return chartData;
};
*/


/* dc-
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
*/

/*
  const response = await fetch("http://localhost:8081/api/tqs");

*/

function TqsGraph({ casesType }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      // await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      // await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      await fetch("http://localhost:8081/api/tqs")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data);
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
                backgroundColor: "rgba(077, 76, 57, 0.5)",
                borderColor: "#CC1077",
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

export default TqsGraph;

