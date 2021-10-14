import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

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

      },
    ],
  },
};



const buildChartData = (data) => {
  let chartData = [];

  for (let tqs in data) {

     var newDataPoint = {
        x: data[tqs].tqstimestamps, //time : 4,
        y: data[tqs].concentration, //SPN1761 : 3,
      };
      chartData.push(newDataPoint);
    }

  return chartData;
};



function MtqsGraph({ casesType }) {

  var chartData = [];

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      // await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      await fetch("http://localhost:8081/monitor/tqs")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          var chartData = buildChartData(data);
          setData(chartData);
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

export default MtqsGraph;

