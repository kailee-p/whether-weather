import { Router } from 'express';
import { getLocationFromUserInput, getWeatherReport, saveWeatherReport, getLastTenWeatherReports, deleteAllWeatherReports } from '../controllers/weather-report-controllers';

const router: Router = Router();

router.post('/weather-report',
  getLocationFromUserInput, 
  getWeatherReport,
  saveWeatherReport
);

router.get('/weather-report/previous-weather-reports',
  getLastTenWeatherReports
);

router.delete('/weather-report/delete-all',
  deleteAllWeatherReports
);

export default router;