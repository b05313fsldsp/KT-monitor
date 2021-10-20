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
          format: "hh:mm:ss", // "HH:mm",
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
        x: data[tqs].tqstimestamps, // time : 4,
        y: data[tqs].tanklevel, // concentration, //+ Math.random(10), // temp2, concentration, SPN1761 : 3,
      };
      chartData.push(newDataPoint);
    }

  return chartData;
};


function Tanklevel({ casesType }) {

  var chartData = [];

  const [data, setData] = useState({});
  const api_url = 'http://10.3.1.93:8081/monitor/tqs';

  useEffect(() => {
    const fetchData = async () => {
      // await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      await fetch(api_url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          var chartData = buildChartData(data);
          setData(chartData);
          console.log(chartData);
        });
    };

    fetchData();
    //dc-
    setInterval(fetchData, 200);



  }, [casesType]);



  /*
              datasets: [
              {
                backgroundColor: "rgba(077, 76, 57, 0.5)",
                borderColor: "#CC1077",
                data: data,
              },
            ],
*/



  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                borderColor: "#000001",
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

export default Tanklevel;

