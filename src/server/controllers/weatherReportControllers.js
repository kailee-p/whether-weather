"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllWeatherReports = exports.getLastTenWeatherReports = exports.saveWeatherReport = exports.getWeatherReport = void 0;
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
    weather_report_1.default.create({
        city,
        country,
        weatherTitle,
        weatherDesc,
        actualTemp,
        feelsLikeTemp,
        timestamp
    })
        .then(() => {
        return res.json(res.locals.weatherReport);
    })
        .catch((err) => console.log('ERR in saveWeatherReport: ', err));
};
exports.saveWeatherReport = saveWeatherReport;
//retrieves last 10 or fewer weather reports to display
const getLastTenWeatherReports = async (req, res, next) => {
    console.log('getLastTenWeatherReports middleware called');
    weather_report_1.default.find({}, { _id: 0, __v: 0, weatherDesc: 0, feelsLikeTemp: 0 })
        .sort({ '_id': -1 })
        .limit(10)
        .exec()
        .then((lastTenReports) => res.json(lastTenReports))
        .catch((err) => console.log('ERR in getLastTenWeatherReports: ', err));
};
exports.getLastTenWeatherReports = getLastTenWeatherReports;
//clears all weather reports from database
const deleteAllWeatherReports = async (req, res, next) => {
    console.log('deleteAllWeatherReports middleware called');
    weather_report_1.default.collection
        .drop()
        .then(() => res.send('You successfully deleted all the weather reports.'))
        .catch((err) => console.log('ERR in deleteAllWeatherReports: ', err));
};
exports.deleteAllWeatherReports = deleteAllWeatherReports;
