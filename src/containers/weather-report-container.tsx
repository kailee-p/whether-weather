import React from 'react';
import VideoBackground from '../components/video-background';
import WeatherReport from '../components/weather-report';
import WeatherSidebar from '../components/weather-sidebar';
import '../css/weather-report-container.css';

const WeatherReportContainer = (props: any): JSX.Element => {
  return (
  <div id="weather-report-container">
    <VideoBackground />
    <WeatherReport 
      weatherData={props.weatherData} /> 
    <WeatherSidebar />
  </div>
  )
}

export default WeatherReportContainer;