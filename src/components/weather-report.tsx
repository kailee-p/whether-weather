import React from 'react';

const WeatherReport = (props: any): JSX.Element => {
  return (
    <div id="weather-report">
      <p>Weather as of {props.weatherData.timestamp}</p>
      <p>City: {props.weatherData.city}</p>
      <p>Country: {props.weatherData.country}</p>
      <p>ActualTemp: {props.weatherData.actualTemp}° F</p>
      <p>feelsLikeTemp: {props.weatherData.feelsLikeTemp}° F</p>
      <p>{props.weatherData.weatherTitle}: {props.weatherData.weatherDesc}</p>
    </div>
  )
}

export default WeatherReport;