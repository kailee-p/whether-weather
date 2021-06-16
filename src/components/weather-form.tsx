import React, { useState } from 'react';

const WeatherForm = (props: any): JSX.Element => {
  const [message, setMessage] = useState("");

  const handleSubmit = (evt: React.FormEvent<EventTarget>): void => {
    evt.preventDefault();

    fetch('/weather-report', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
      }),
    })
      .then((res: any) => res.json())
      .then((weatherData: any) => {
        props.setWeatherData((prevState: any) => ({
          city: weatherData.city,
          country: weatherData.country, 
          actualTemp: weatherData.actualTemp,
          feelsLikeTemp: weatherData.feelsLikeTemp,
          weatherTitle: weatherData.weatherTitle,
          weatherDesc: weatherData.weatherDesc,
          timestamp: weatherData.timestamp,
        }), [props.setWeatherData])

        //set fetched to true so weather report will render
        props.setWeatherDataFetched(true);
      })
      .catch((err: unknown) => console.log('Error in POST request for weather report ', err))
  }

  return (
    <form id="weather-form" onSubmit={handleSubmit}>
      <label>
        <input
          id="weather-message-input"
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </label>
      <input id="weather-message-submit-button" type="submit" value="submit" />
    </form>
  );
}

export default WeatherForm;