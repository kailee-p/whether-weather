import React, { useState } from 'react';

function WeatherForm(): JSX.Element {
  const [location, setLocation] = useState("");
  
  const handleSubmit = (evt: React.FormEvent<EventTarget>): void => {
      evt.preventDefault();
      console.log(`Submitting Location ${location}`);
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