import React, { useState } from 'react';

function WeatherForm(): JSX.Element {
  const [message, setMessage] = useState("");
  
  const handleSubmit = (evt: React.FormEvent<EventTarget>): void => {
    evt.preventDefault();
    console.log(message);

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
      .then((res: any) => console.log('response from Kailees server', res))
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