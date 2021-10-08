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
          display: true,
        },
        ticks: {
          // Include a dollar sign in the ticks
          /* callback: function (value, index, values) {
            return numeral(value).format("0a");
          },*/
        },
      },
    ],
  },
};



const buildChartData = (data) => {
  let chartData = [];

  for (let tqs in data) {

     var newDataPoint = {
        x: data[tqs].TTIMESTAMP, //time : 4,
        y: data[tqs].SPN1761, //SPN1761 : 3,
      };
      chartData.push(newDataPoint);
    }

    // console.log(chartData);
    /*
      for (let index in chartData) {

        console.log(chartData[index].x);
        console.log(chartData[index].y);

      }
    */
  return chartData;
};



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

  var chartData = [];

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
          var chartData = buildChartData(data);
          setData(chartData);
          // console.log(chartData);
          // console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();

    //dc-
    // console.log(chartData);


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

