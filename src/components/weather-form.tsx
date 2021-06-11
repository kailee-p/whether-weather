import React, { useState } from 'react';

function WeatherForm(): JSX.Element {
  const [location, setLocation] = useState("");
  
  const handleSubmit = (evt: React.FormEvent<EventTarget>): void => {
    evt.preventDefault();
    
    fetch('/weather-report', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        location: location,
      }),
    })
      .then((res) => console.log('res', res))
      .catch((err) => console.log('Error in POST request for weather report ', err))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          id="location-input"
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </label>
      <input id="location-submit-button" type="submit" value="submit" />
    </form>
  );
}


export default WeatherForm;