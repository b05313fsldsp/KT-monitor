import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './utlis';
//dc-
import ReactECharts from 'echarts-for-react';
import ReactEchartsCore from 'echarts-for-react/lib/core';

import LineGraph from './LineGraph'
import TqsGraph from './TqsGraph'  
import MtqsGraph from './MtqsGraph'  // MtqsGraph 
import Tanklevel from './Tanklevel'
import Concentration from './Concentration'


import GeneralLineChart from './TqsGraph'  
import StateChartline from './StateChartline'
import Page from './Page'
import { Line } from "react-chartjs-2";


function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('Worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      })
  })

  // STATE = How to write a variable in React
  useEffect(() => {
    //The code inside here will run only once and will not be loaded again until the user prompts the server to refresh

    //async -> send the requets, wait for it, and then do something about the info

    // going to making "Promises" here below
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((responce) => responce.json())
        .then((data) => {
          
          // [item1, item2, item3]

          // ^^^ item1 ... -> returning an object in a shape
          // ^^^ item2 ... -> returning an object in a shape
          // ^^^ item2 ... -> returning an object in a shape

          const countries = data.map((country) => ({
            name: country.country, //United Kingdom, Unites States Of America, India,
            value: country.countryInfo.iso2 //UK, USA, IND
          }));
          
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);
  

  const url =
    countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/countries/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        
        //All of the data from the country response will be stored here
        setCountryInfo(data);
        })
      }
  //dc- console.log("CountryInfo", countryInfo)
  // console.log("CountryInfo", countryInfo)
           // {console.log({TqsGraph.})}
  // a.
  // aaa. <GeneralLineChart state={this.props.state} />

  return (
    <div className="app"> {/* BEM naming convention */}
      <div className="app__left">
        <div className="app__header">
          {/* Header */}
          <h1>KUS TQS Monitor</h1>

          {/* Title + Dropdown */}
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map((country) =>
                <MenuItem value={country.value}>{country.name}</MenuItem>)}
              {/* <MenuItem value="worldwide">Worldwide</MenuItem>
              <MenuItem value="worldwide">Option 2</MenuItem>
              <MenuItem value="worldwide">Yasssss</MenuItem> */}
            </Select>
          </FormControl>
        </div>

        {/* Infoboxes */}
        <div className="app__stats">
          <InfoBox title="Monitor Cases" cases={countryInfo.todayCases} total={countryInfo.cases} /> 
          <InfoBox title="Online" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Defeat" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>


        <CardContent>
         {/* Graphs */}
          <h3>Tanklevel Data Monitoring ... </h3>

          <Tanklevel/>

          {/* <MtqsGraph/> */}
          {/* <button onClick={timerStart}>Start</button> */}
         
        </CardContent>
        <CardContent>
         {/* Graphs */}
          <h3>Concentration Monitoring ... </h3>
          <Concentration/>
                  
        </CardContent>
        <CardContent>
         {/* Graphs */}
          {/*<h3>API Online Data Monitoring ... </h3>*/}
          {/*<LineGraph/>*/}        
        </CardContent>


        {/* Map */}
        {/*<Map />*/}
      </div>
      
      <Card className="app__right">
        {/* Table */}
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
        </CardContent>
        {/* Graphs */}
        <CardContent>
         {/* Graphs */}
          <h3>Tanklevel Data Monitoring ... </h3>
          <Tanklevel/>
        </CardContent>
        <CardContent>
         {/* Graphs */}
          <h3>Concentration Data Monitoring ... </h3>
          <Concentration/>
        </CardContent>
      </Card>
    </div>
      
  );
}


export default App;
