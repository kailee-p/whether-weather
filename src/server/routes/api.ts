import { Router } from 'express';
import { getWeatherReport, saveWeatherReport, getLastTenWeatherReports, deleteAllWeatherReports } from '../controllers/weatherReportControllers';

const router: Router = Router();

router.post('/weather-report',
  getWeatherReport,
  saveWeatherReport
);

router.get('/weather-report/weather-logs',
  getLastTenWeatherReports
);

router.delete('/weather-report/delete-all',
  deleteAllWeatherReports
);

export default router;