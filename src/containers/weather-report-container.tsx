import React from 'react';
import WeatherReport from '../components/weather-report';
import WeatherSidebar from '../components/weather-sidebar';

function WeatherReportContainer(): JSX.Element {
  return (
  <div id="weather-report-container">
    <WeatherReport />
    <WeatherSidebar />
  </div>
  )
}

export default WeatherReportContainer;