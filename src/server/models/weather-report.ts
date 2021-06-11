import { WeatherReport } from '../../types/weather-report';
import { model, Schema } from 'mongoose';

const weatherReportSchema: Schema = new Schema(
  {
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    weatherTitle: {
      type: String,
      required: true
    },
    weatherDesc: {
      type: String,
      required: true
    },
    actualTemp: {
      type: Number,
      required: true
    },
    feelsLikeTemp: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Number,
      required: true
    }
  }
)

export default model<WeatherReport>('weatherreport', weatherReportSchema);