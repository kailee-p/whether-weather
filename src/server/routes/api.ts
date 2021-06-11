import { Response, Request, NextFunction, Router } from 'express';
import { getWeatherReport, saveWeatherReport, getAllWeatherReports, deleteAllWeatherReports } from '../controllers/weatherReportControllers';
const weatherReportController = require('../controllers/weatherReportController');

const router: Router = Router();

router.post('/weather-report',
  getWeatherReport,
  saveWeatherReport,
  (req: Request, res: Response, next: NextFunction) => res.status(200)
);

router.get('/weather-logs',
  getAllWeatherReports,
  (req: Request, res: Response, next: NextFunction) => res.status(200)
);

router.delete('/delete-all',
  deleteAllWeatherReports,
  (req: Request, res: Response, next: NextFunction) => res.status(200)
);

export default router;