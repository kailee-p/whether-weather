import React from 'react';

const PreviousWeatherReport = (props: any) => {
  return (
    <div>
      {props.timestamp}<br />
      {props.city}, {props.country}<br />
      {props.weatherTitle} ({props.actualTemp}° F)<br />
    </div>
  )
}

export default PreviousWeatherReport;