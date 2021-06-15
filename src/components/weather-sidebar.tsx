import React, { useState, useEffect } from 'react';
import PreviousWeatherReport from './previous-weather-report';

const WeatherSidebar = () => {
  const [lastTenWeatherReports, setLastTenWeatherReports] = useState(null);

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

  const prevWeatherReports: JSX.Element[] = [];

  console.log('last ten', lastTenWeatherReports);

  if (lastTenWeatherReports !== null) {
    for (let i = 0; i < 9; i++) {
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
          {prevWeatherReports}
        </section>
        <button>Delete logs</button>
      </div>
    )
  } else {
   return (
     <div id="loading">
       Loading...
     </div>
   ) 
  }

}

export default WeatherSidebar;