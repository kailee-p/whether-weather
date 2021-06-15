import React from 'react';
import countries from 'i18n-iso-countries';

const PreviousWeatherReport = (props: any) => {

  const country = countries.getName(props.country, 'en', { select: 'official' })

  return (
    <div>
      {props.timestamp}<br />
      {props.city}, {country}<br />
      {props.weatherTitle} ({props.actualTemp}° F)<br />
    </div>
  )
}

export default PreviousWeatherReport;