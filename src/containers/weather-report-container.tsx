import React from 'react';
import WeatherReport from '../components/weather-report';
import WeatherSidebar from '../components/weather-sidebar';

const WeatherReportContainer = (props: any): JSX.Element => {
  return (
  <div id="weather-report-container">
    <WeatherReport 
      weatherData={props.weatherData} />
    <WeatherSidebar />
  </div>
  )
}

export default WeatherReportContainer;