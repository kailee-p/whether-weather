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
  console.log('city', city);
  WeatherReport.create({
    city,
    country,
    weatherTitle,
    weatherDesc,
    actualTemp,
    feelsLikeTemp,
    timestamp
  })
    .then((document: WeatherReportType) => {
      console.log(document);
      res.send(document);
    })
    .catch((err: unknown) => console.log('ERR in saveWeatherReport: ', err));
}

//retrieves all weather reports from database for display
export const getAllWeatherReports = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('getAllWeatherReports middleware called');
    return next();
  } catch (err) {

  }
}

//clears all weather reports from database
export const deleteAllWeatherReports = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('deleteAllWeatherReports middleware called');
    return next();
  } catch (err) {

  }
}