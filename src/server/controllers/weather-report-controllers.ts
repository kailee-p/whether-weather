const fetch = require('node-fetch');
const tuc = require('temp-units-conv');
import countries from 'i18n-iso-countries';
import { Response, Request, NextFunction } from 'express';
import WeatherReport from '../models/weather-report';
import { WeatherReport as WeatherReportType } from '../../types/weather-report';

//gets location from user input using wit.ai NLP
export const getLocationFromUserInput = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log('processUserInput middleware called');

  const question = req.body.message;
  const uri = 'https://api.wit.ai/message?v=20200513&q=' + question; 
  const auth = 'Bearer ' + process.env.SERVER_TOKEN;
  
  fetch(uri, { headers: { Authorization: auth }})
  .then((res: any) => res.json())
  .then((witData: any) => {
    const locationArr = witData.entities['wit$location:location'];
    if (!locationArr) { //error for no location found
      return res.json('ERROR: NO CITIES');
    } else if (locationArr.length > 1) { //error for too many locations found
      return res.json('ERROR: TOO MANY CITIES');
    } 
    res.locals.location = locationArr[0].body;
    return next();
  })
  .catch((err: any) => console.log('ERR in getLocationFromUserInput: ', err));
}

//calls weather API to retrieve weather report based on user input
export const getWeatherReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
  .then((res: any) => res.json())
  .then((res: any) => res.data.getCityByName)
  .then((weatherData: any) => {
    if (weatherData === null) { //error for no weather data retrieval
      return res.json('ERROR: NO WEATHER DATA');
    }
    //convert country code to country
    const country = countries.getName(weatherData.country, 'en', { select: 'official' })
    //convert temperatures to Fahrenheit rounded to nearest integer
    const actualTempFahrenheit: number = Math.round(tuc.k2f(weatherData.weather.temperature.actual));
    const feelsLikeTempFahrenheit: number = Math.round(tuc.k2f(weatherData.weather.temperature.feelsLike));
    //convert time stamp to string
    const timestampString: String = (new Date(weatherData.weather.timestamp * 1000)).toString();

    //store data in res.locals to pass to next piece of middleware
    res.locals.weatherReport = {
      city: weatherData.name,
      country: country,
      weatherTitle: weatherData.weather.summary.title,
      weatherDesc: weatherData.weather.summary.description,
      actualTemp: actualTempFahrenheit,
      feelsLikeTemp: feelsLikeTempFahrenheit,
      timestamp: timestampString,
    }
    return next();
  })
  .catch((err: any) => console.log('Error fetching GraphQL query: ', err));
}

//saves new weather report from GraphQL weather API in database
export const saveWeatherReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log('saveWeatherReport middleware called');
  const { city, country, weatherTitle, weatherDesc, actualTemp, feelsLikeTemp, timestamp } = res.locals.weatherReport;

  WeatherReport.create({
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
    .catch((err: unknown) => console.log('ERR in saveWeatherReport: ', err));
}

//retrieves last 10 or fewer weather reports to display
export const getLastTenWeatherReports = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log('getLastTenWeatherReports middleware called');

  WeatherReport.find({}, { _id: 0, __v: 0, weatherDesc: 0, feelsLikeTemp: 0 })
    .sort({ '_id': -1 })
    .limit(10)
    .exec()
    .then((lastTenReports: (WeatherReportType)[]) => res.status(200).json(lastTenReports))
    .catch((err: unknown) => console.log('ERR in getLastTenWeatherReports: ', err))
}

//clears all weather reports from database
export const deleteAllWeatherReports = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log('deleteAllWeatherReports middleware called');

  WeatherReport.collection
    .drop()
    .then(() => res.status(200).send('You successfully deleted all the weather reports.'))
    .catch((err: unknown) => console.log('ERR in deleteAllWeatherReports: ', err))
}