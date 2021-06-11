import { Response, Request, NextFunction } from 'express';
import { WeatherReport } from '../../types/weather-report';

//calls API to retrieve weather report based on user input
export const getWeatherReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('getWeatherReport middleware called');
    return next();
  } catch (err) {

  }
}

//saves new weather report from API in database
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