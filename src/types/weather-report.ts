import { Document } from 'mongoose';

export interface WeatherReport extends Document {
  city: string,
  country: string,
  weatherTitle: string,
  weatherDesc: string,
  actualTemp: number,
  feelsLikeTemp: number,
  timestamp: string,
}