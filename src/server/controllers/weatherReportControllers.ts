const fetch = require('node-fetch');
import { Response, Request, NextFunction } from 'express';
import WeatherReport from '../models/weather-report';
import { WeatherReport as WeatherReportType } from '../../types/weather-report';

//calls weather API to retrieve weather report based on user input
export const getWeatherReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
  .then((res: any) => res.json())
  .then((res: any) => res.data.getCityByName)
  .then((weatherData: any) => {
    res.locals.weatherReport = {
      city: weatherData.name,
      country: weatherData.country,
      weatherTitle: weatherData.weather.summary.title,
      weatherDesc: weatherData.weather.summary.description,
      actualTemp: weatherData.weather.temperature.actual,
      feelsLikeTemp: weatherData.weather.temperature.feelsLike,
      timestamp: weatherData.weather.timestamp
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
      return res.json(res.locals.weatherReport);
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
    .then((lastTenReports: (WeatherReportType)[]) => res.json(lastTenReports))
    .catch((err: unknown) => console.log('ERR in getLastTenWeatherReports: ', err))
}

//clears all weather reports from database
export const deleteAllWeatherReports = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log('deleteAllWeatherReports middleware called');

  WeatherReport.collection
    .drop()
    .then(() => res.send('You successfully deleted all the weather reports.'))
    .catch((err: unknown) => console.log('ERR in deleteAllWeatherReports: ', err))
}