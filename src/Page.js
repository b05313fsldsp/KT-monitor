
import ReactECharts from 'echarts-for-react';
import React, { useState, useEffect } from "react";

// var x = [];
// var y = [];
var chartData = [];

const buildChartData = (data) => {
    let chartData = [];

    for (let tqs in data) {

       var newDataPoint = {
          x: data[tqs].TTIMESTAMP, //time : 4,
          y: data[tqs].SPN1761, //SPN1761 : 3,
        };


        chartData.push(newDataPoint);
        
        // console.log(chartData);

        for (let index in chartData) {

          // console.log(chartData[index].x);
          // console.log(chartData[index].y);

        }
      }
    
    return chartData;
};



const Page: React.FC = () => {

  var aaa = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var bbb = [1, 2, 3, 4, 5, 6, 6, 4, 3, 2]
  var chartData = [];

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      // await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      await fetch("http://localhost:8081/api/tqs")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          var chartData = buildChartData(data);
          setData(chartData);

          //dc-
          // console.log(`data` + data);
          for (let index in chartData) { // chartData
            console.log(chartData[index].x);  // console.log(chartData[index].x);

            console.log(chartData[index].y); // console.log(chartData[index].y);

           }
          

        });
    };
          
       fetchData();
  
       // console.log(chartData);

  });


  

  const lineoptions = {



    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: chartData.x,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: chartData.x,
        type: 'line',
        smooth: false,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  return <ReactECharts option={lineoptions} />;
};

export default Page;



