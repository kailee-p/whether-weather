import React from 'react';
import WeatherReport from '../components/weather-report';
import WeatherSidebar from '../components/weather-sidebar';
function WeatherReportContainer() {
    return (React.createElement("div", { id: "weather-report-container" },
        React.createElement(WeatherReport, null),
        React.createElement(WeatherSidebar, null)));
}
export default WeatherReportContainer;
