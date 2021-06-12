import React from "react";
import WeatherIntro from './components/weather-intro';
import WeatherForm from './components/weather-form';
import WeatherReportContainer from './containers/weather-report-container';

function App(): JSX.Element {
  return (
  <div>
    <WeatherIntro />
    <WeatherForm />
    <WeatherReportContainer />
  </div>
  )
}

export default App;