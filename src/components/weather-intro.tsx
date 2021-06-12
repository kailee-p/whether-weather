import React, { useState } from 'react';

function WeatherIntro(): JSX.Element {

  const [introText, setIntroText] = useState([
    'Hi, I\'m WhetherWeather!',
    'My creator programmed me to get the weather for you!',
    'But unfortunately, she did not program me to love. :(',
    'Please ask me about the weather! :)'
  ]);

  return (
    <div id="weather-intro">
      <h1>{}</h1>
    </div>
  );

}

export default WeatherIntro;