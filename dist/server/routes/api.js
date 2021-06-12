import { Router } from 'express';
import { getLocationFromUserInput, getWeatherReport, saveWeatherReport, getLastTenWeatherReports, deleteAllWeatherReports } from '../controllers/weatherReportControllers';
var router = Router();
router.post('/weather-report', getLocationFromUserInput, getWeatherReport, saveWeatherReport);
router.get('/weather-report/weather-logs', getLastTenWeatherReports);
router.delete('/weather-report/delete-all', deleteAllWeatherReports);
export default router;
