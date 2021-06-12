"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weatherReportControllers_1 = require("../controllers/weatherReportControllers");
const router = express_1.Router();
router.post('/weather-report', weatherReportControllers_1.getWeatherReport, weatherReportControllers_1.saveWeatherReport);
router.get('/weather-report/weather-logs', weatherReportControllers_1.getLastTenWeatherReports);
router.delete('/weather-report/delete-all', weatherReportControllers_1.deleteAllWeatherReports);
exports.default = router;
