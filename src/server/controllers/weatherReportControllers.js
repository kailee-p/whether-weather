"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllWeatherReports = exports.getAllWeatherReports = exports.saveWeatherReport = exports.getWeatherReport = void 0;
const fetch = require('node-fetch');
const weather_report_1 = __importDefault(require("../models/weather-report"));
//calls weather API to retrieve weather report based on user input
const getWeatherReport = async (req, res, next) => {
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
        .then((res) => res.data.getCityByName)
        .then((weatherData) => {
        res.locals.weatherReport = {
            city: weatherData.name,
            country: weatherData.country,
            weatherTitle: weatherData.weather.summary.title,
            weatherDesc: weatherData.weather.summary.description,
            actualTemp: weatherData.weather.temperature.actual,
            feelsLikeTemp: weatherData.weather.temperature.feelsLike,
            timestamp: weatherData.weather.timestamp
        };
        return next();
    })
        .catch((err) => console.log('Error fetching GraphQL query: ', err));
};
exports.getWeatherReport = getWeatherReport;
//saves new weather report from GraphQL weather API in database
const saveWeatherReport = async (req, res, next) => {
    console.log('saveWeatherReport middleware called');
    const { city, country, weatherTitle, weatherDesc, actualTemp, feelsLikeTemp, timestamp } = res.locals.weatherReport;
    console.log('city', city);
    weather_report_1.default.create({
        city,
        country,
        weatherTitle,
        weatherDesc,
        actualTemp,
        feelsLikeTemp,
        timestamp
    })
        .then((document) => {
        console.log(document);
        res.send(document);
    })
        .catch((err) => console.log('ERR in saveWeatherReport: ', err));
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
