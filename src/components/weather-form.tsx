import React, { useState } from 'react';
import '../css/weather-form.css';

const WeatherForm = (props: any): JSX.Element => {
  const [message, setMessage] = useState("");

  const handleSubmit = (evt: React.FormEvent<EventTarget>): void => {
    evt.preventDefault();

    if (message === '') { //error for empty message
      console.log('empty error message');
      props.setErrorMessage((prevState: string) => 'ERROR: Please enter a question.');
    } else { //message contains text, attempt to obtain location
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
          //check if weatherData has data or is an error 
          if (weatherData.city !== undefined) {
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
          } else { //returns an error
            if (weatherData === 'ERROR: NO CITIES') {
              props.setErrorMessage((prevState: string) => 'ERROR: Not able to find any cities in your query. Please try again.');
            } else if (weatherData === 'ERROR: TOO MANY CITIES') {
              props.setErrorMessage((prevState: string) => 'ERROR: There are too many cities in your question. Please try again.');
            } else if (weatherData === 'ERROR: NO WEATHER DATA') {
              props.setErrorMessage((prevState: string) => 'ERROR: Was not able to retrieve weather data. Please try again.');
            } else {
              props.setErrorMessage((prevState: string) => 'ERROR: An unknown error occurred. Please try again.');
            }
          }
        })
        .catch((err: unknown) => console.log('Error in POST request for weather report ', err))
    }
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