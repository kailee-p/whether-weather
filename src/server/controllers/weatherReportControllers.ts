const fetch = require('node-fetch');

import { Response, Request, NextFunction } from 'express';
import { WeatherReport } from '../../types/weather-report';

//calls weather API to retrieve weather report based on user input
export const getWeatherReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
    .then((res: any) => res.json())
    .then((weatherData: any) => console.log('weatherData', weatherData))
    .catch((err: any) => console.log('Error fetching GraphQL query: ', err));

    return next();
  } catch (err) {
  
  }
}

//saves new weather report from GraphQL weather API in database
export const saveWeatherReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('saveWeatherReport middleware called');
    return next();
  } catch (err) {

  }
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