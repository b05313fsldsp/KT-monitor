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


const useCounter = () => {
  const initState = {
    count: 0,
    start: false,
    times: 1
  };
  let [count, setCount] = useState(initState.count);
  let [start, setStart] = useState(initState.start);
  let [times, setTimes] = useState(initState.times);
  const timerStart = () => setStart(true);
  const timerStop = () => setStart(false);
  const reset = () => {
    setCount(initState.count);
    setStart(initState.start);
    setTimes(initState.times);
  };

  useEffect(
    () => {
      if (!start) {
        return;
      }
      let id = setInterval(() => {
        setCount(count => count + 1);
      }, 1000 / times);
      return () => clearInterval(id);
    },
    [start, times]
  );
  return {
    count,
    start,
    times,
    timerStart,
    timerStop,
    reset
  };
};



function MtqsGraph() {

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

  });

  const {
    count,
    timerStart,
    timerStop,
    reset
  } = useCounter();
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

      <div className="display">{count}</div>
      <button onClick={timerStart}>Start</button>
      <button onClick={timerStop}>Pause</button>
      <button onClick={reset}>Reset</button>


    </div>
  );

}

export default MtqsGraph;

