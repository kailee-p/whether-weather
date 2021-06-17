import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import WeatherForm from './components/weather-form';
import WeatherReportContainer from './containers/weather-report-container';
import VideoBackground from './components/video-background';
import './css/App.css';

const App: React.FC = () => {

  //weather data
  const [weatherData, setWeatherData] = useState<{ city: string, country: string, actualTemp: number, feelsLikeTemp: number, weatherTitle: string, weatherDesc: string, timestamp: string }>({
    city: '',
    country: '',
    actualTemp: 0,
    feelsLikeTemp: 0,
    weatherTitle: '',
    weatherDesc: '',
    timestamp: '',
  })

  //determines if weather data was fetched and renders the weather report
  const [weatherDataFetched, setWeatherDataFetched] = useState(false);

  //error handling
  const [errorMessage, setErrorMessage] = useState('');
  
  //render weather report if weather data was fetched successfully
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
  
  //check for error message
  if (errorMessage !== '') {
    window.alert(errorMessage);    
  }

  return (
  <div>
    <VideoBackground />
    <div id="weather-homepage-container">
      <div id="weather-form-container">
        <h1>Whether Weather</h1>
        <h2>Ask me about the weather!</h2>
        <WeatherForm 
          setWeatherData={setWeatherData}
          setWeatherDataFetched={setWeatherDataFetched}
          setErrorMessage={setErrorMessage} />
      </div>
    </div>
  </div>
  )
}

export default App;