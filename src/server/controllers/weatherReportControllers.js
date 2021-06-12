"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllWeatherReports = exports.getAllWeatherReports = exports.saveWeatherReport = exports.getWeatherReport = void 0;
const fetch = require('node-fetch');
//calls weather API to retrieve weather report based on user input
const getWeatherReport = async (req, res, next) => {
    try {
        console.log('getWeatherReport middleware called');
        const location = req.body.location;
        //GraphQL query for location data
        const locationQuery = `
    query { getCityByName(name: "${location}") {
        name
        country
        weather {
          summary {
            title
            description
          }
          temperature {
            actual
            feelsLike
          }
          timestamp
        }
      }
    }`;
        //queries GraphQL API for weather information based on user location input
        fetch('https://graphql-weather-api.herokuapp.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: locationQuery,
            }),
        })
            .then((res) => res.json())
            .then((weatherData) => console.log('weatherData', weatherData))
            .catch((err) => console.log('Error fetching GraphQL query: ', err));
        return next();
    }
    catch (err) {
    }
};
exports.getWeatherReport = getWeatherReport;
//saves new weather report from GraphQL weather API in database
const saveWeatherReport = async (req, res, next) => {
    try {
        console.log('saveWeatherReport middleware called');
        return next();
    }
    catch (err) {
    }
};
exports.saveWeatherReport = saveWeatherReport;
//retrieves all weather reports from database for display
const getAllWeatherReports = async (req, res, next) => {
    try {
        console.log('getAllWeatherReports middleware called');
        return next();
    }
    catch (err) {
    }
};
exports.getAllWeatherReports = getAllWeatherReports;
//clears all weather reports from database
const deleteAllWeatherReports = async (req, res, next) => {
    try {
        console.log('deleteAllWeatherReports middleware called');
        return next();
    }
    catch (err) {
    }
};
exports.deleteAllWeatherReports = deleteAllWeatherReports;
