import React from 'react';
import '../css/weather-report.css';

const WeatherReport = (props: any): JSX.Element => {
  return (
    <div id="weather-report">
      <h2>Your Weather Report</h2>
      <p>Weather as of <strong>{props.weatherData.timestamp}</strong></p>
      <p><strong>City:</strong> {props.weatherData.city}</p>
      <p><strong>Country:</strong> {props.weatherData.country}</p>
      <p><strong>Temperature:</strong> {props.weatherData.actualTemp}° F (Feels Like {props.weatherData.feelsLikeTemp}° F)</p>
      <p><strong>{props.weatherData.weatherTitle}:</strong> {props.weatherData.weatherDesc}</p>
    </div>
  )
}

export default WeatherReport;