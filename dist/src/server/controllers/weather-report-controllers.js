"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllWeatherReports = exports.getLastTenWeatherReports = exports.saveWeatherReport = exports.getWeatherReport = exports.getLocationFromUserInput = void 0;
const fetch = require('node-fetch');
const tuc = require('temp-units-conv');
const i18n_iso_countries_1 = __importDefault(require("i18n-iso-countries"));
const weather_report_1 = __importDefault(require("../models/weather-report"));
//gets location from user input using wit.ai NLP
const getLocationFromUserInput = async (req, res, next) => {
    console.log('processUserInput middleware called');
    const question = req.body.message;
    const uri = 'https://api.wit.ai/message?v=20200513&q=' + question;
    const auth = 'Bearer ' + process.env.SERVER_TOKEN;
    fetch(uri, { headers: { Authorization: auth } })
        .then((res) => res.json())
        .then((witData) => {
        const locationArr = witData.entities['wit$location:location'];
        if (!locationArr) {
            res.json('I wasn\'t able to detect any cities in your question. Please ask me something else.');
            return next('ERROR: no cities');
        }
        else if (locationArr.length > 1) {
            res.json('Your question has too many cities for me to look up! Please ask about one city only.');
            return next('ERROR: too many cities');
        }
        res.locals.location = locationArr[0].body;
        return next();
    })
        .catch((err) => console.log('ERR in getLocationFromUserInput: ', err));
};
exports.getLocationFromUserInput = getLocationFromUserInput;
//calls weather API to retrieve weather report based on user input
const getWeatherReport = async (req, res, next) => {
    console.log('getWeatherReport middleware called');
    const location = res.locals.location;
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
        //error for no weather data retrieval
        if (weatherData === null) {
            res.json('I wasn\'t able to find any weather data for you. Please try again.');
            return next('ERROR: no weather data');
        }
        //convert country code to country
        const country = i18n_iso_countries_1.default.getName(weatherData.country, 'en', { select: 'official' });
        //convert temperatures to Fahrenheit rounded to nearest integer
        const actualTempFahrenheit = Math.round(tuc.k2f(weatherData.weather.temperature.actual));
        const feelsLikeTempFahrenheit = Math.round(tuc.k2f(weatherData.weather.temperature.feelsLike));
        //convert time stamp to string
        const timestampString = (new Date(weatherData.weather.timestamp * 1000)).toString();
        //store data in res.locals to pass to next piece of middleware
        res.locals.weatherReport = {
            city: weatherData.name,
            country: country,
            weatherTitle: weatherData.weather.summary.title,
            weatherDesc: weatherData.weather.summary.description,
            actualTemp: actualTempFahrenheit,
            feelsLikeTemp: feelsLikeTempFahrenheit,
            timestamp: timestampString,
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
        return res.status(200).json(res.locals.weatherReport);
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
        .then((lastTenReports) => res.status(200).json(lastTenReports))
        .catch((err) => console.log('ERR in getLastTenWeatherReports: ', err));
};
exports.getLastTenWeatherReports = getLastTenWeatherReports;
//clears all weather reports from database
const deleteAllWeatherReports = async (req, res, next) => {
    console.log('deleteAllWeatherReports middleware called');
    weather_report_1.default.collection
        .drop()
        .then(() => res.status(200).send('You successfully deleted all the weather reports.'))
        .catch((err) => console.log('ERR in deleteAllWeatherReports: ', err));
};
exports.deleteAllWeatherReports = deleteAllWeatherReports;
