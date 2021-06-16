import React, { useState, useEffect } from 'react';
import PreviousWeatherReport from './previous-weather-report';

const WeatherSidebar = () => {
  const [lastTenWeatherReports, setLastTenWeatherReports] = useState<any[]>([]);

  useEffect(() => {
    fetch('/weather-report/previous-weather-reports', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((res: any) => res.json())
      .then((reports) => {
        setLastTenWeatherReports(reports);
      })
      .catch((err: unknown) => console.log('Error in GET request for weather logs: ', err))
  }, []);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (evt): void => {
    evt.preventDefault();

    fetch('/weather-report/delete-all', {
      method: 'DELETE',
    })
      .then((res: any) => {
        console.log('Response to DELETE request: ', res);
        setLastTenWeatherReports([]);
      })
      .catch((err: unknown) => console.log('Error in DELETE request ', err))
  }

  const prevWeatherReports: JSX.Element[] = [];

  if (lastTenWeatherReports.length === 0) {
    return (
      <div>
        There are no previous weather reports in my database! 
      </div>
    )
  } else {
    for (let i = 0; i < lastTenWeatherReports.length; i++) {
      prevWeatherReports.push(<PreviousWeatherReport 
        city={lastTenWeatherReports[i].city}
        country={lastTenWeatherReports[i].country}
        actualTemp={lastTenWeatherReports[i].actualTemp}
        weatherTitle={lastTenWeatherReports[i].weatherTitle}
        timestamp={lastTenWeatherReports[i].timestamp}
        key={i.toString()}
      />)
    }

    return (
      <div id="weather-sidebar">
        <section>
          <h3>Recent Weather Reports</h3>
          {prevWeatherReports}
        </section>
        <button onClick={handleClick}>Delete logs</button>
      </div>
    )
  }
}

export default WeatherSidebar;