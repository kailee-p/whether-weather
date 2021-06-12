import React, { useState } from 'react';

function WeatherForm(): JSX.Element {
  const [message, setMessage] = useState("");
  
  const handleSubmit = (evt: React.FormEvent<EventTarget>): void => {
    evt.preventDefault();
    console.log('message', message);
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
      .then((res: any) => console.log('POST request response', res))
      .catch((err: unknown) => console.log('Error in POST request for weather report ', err))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          id="message-input"
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </label>
      <input id="message-submit-button" type="submit" value="submit" />
    </form>
  );
}


export default WeatherForm;