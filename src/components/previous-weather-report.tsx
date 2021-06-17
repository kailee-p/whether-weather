import React from 'react';
import '../css/previous-weather-report.css';

const PreviousWeatherReport = (props: any) => {
  return (
    <div id="previous-weather-report">
      <strong>{props.timestamp}</strong><br />
      {props.city}, {props.country}<br />
      {props.weatherTitle} ({props.actualTemp}° F)<br />
    </div>
  )
}

export default PreviousWeatherReport;