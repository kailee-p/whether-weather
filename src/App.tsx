import React, { useState } from "react";
import {
  Route,
  Redirect
} from "react-router-dom";
import WeatherForm from './components/weather-form';
import WeatherReportContainer from './containers/weather-report-container';
import './css/App.css';

const App: React.FC = () => {

  const [weatherData, setWeatherData] = useState<{ city: string, country: string, actualTemp: number, feelsLikeTemp: number, weatherTitle: string, weatherDesc: string, timestamp: string }>({
    city: '',
    country: '',
    actualTemp: 0,
    feelsLikeTemp: 0,
    weatherTitle: '',
    weatherDesc: '',
    timestamp: '',
  })

  const [weatherDataFetched, setWeatherDataFetched] = useState(false);

  if (weatherDataFetched === true) {
    return (
    <div>
    <Route path='/weather-report-display'>
            <WeatherReportContainer 
              weatherData={weatherData} />
    </Route>
    <Redirect to={{ pathname: '/weather-report-display' }}  />
    </div>)
  }
  return (
  <div>
    <div id="video-container">
      <video autoPlay loop muted>
        <source src="./videos/whetherweatherbackgroundvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div id="weather-homepage-container">
      <div id="weather-form-container">
        <h1>Whether Weather</h1>
        <h2>Ask me about the weather!</h2>
        <WeatherForm 
          setWeatherData={setWeatherData}
          setWeatherDataFetched={setWeatherDataFetched} />
      </div>
    </div>
  </div>
  )
}

export default App;