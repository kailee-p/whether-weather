import React, { useState } from "react";
import {
  Route,
  Redirect
} from "react-router-dom";
import WeatherIntro from './components/weather-intro';
import WeatherForm from './components/weather-form';
import WeatherReportContainer from './containers/weather-report-container';

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
    <WeatherIntro />
    <WeatherForm 
      setWeatherData={setWeatherData}
      setWeatherDataFetched={setWeatherDataFetched} />
  </div>
  )
}

export default App;