import React, { useState } from "react";
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

  console.log('weatherData state', weatherData);

  return (
  <div>
    <WeatherIntro />
    <WeatherForm 
      setWeatherData={setWeatherData} />
    <WeatherReportContainer 
      weatherData={weatherData} />
  </div>
  )
}

export default App;