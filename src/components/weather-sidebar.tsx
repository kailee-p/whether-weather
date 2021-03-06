import React, { useState, useEffect } from 'react';
import PreviousWeatherReport from './previous-weather-report';
import '../css/weather-sidebar.css';

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
      <div className="weather-sidebar" id="no-weather-reports">
        <h3>Recent Weather Reports</h3>
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
      <div className="weather-sidebar">
        <h3>Recent Weather Reports</h3>
        <div id="prev-weather-report-container">
          {prevWeatherReports}
        </div>
        <button id="delete-weather-reports-button" onClick={handleClick}>Delete Weather Reports</button>
      </div>
    )
  }
}

export default WeatherSidebar;