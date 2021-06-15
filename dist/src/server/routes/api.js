"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weather_report_controllers_1 = require("../controllers/weather-report-controllers");
const router = express_1.Router();
router.post('/weather-report', weather_report_controllers_1.getLocationFromUserInput, weather_report_controllers_1.getWeatherReport, weather_report_controllers_1.saveWeatherReport);
router.get('/weather-report/weather-logs', weather_report_controllers_1.getLastTenWeatherReports);
router.delete('/weather-report/delete-all', weather_report_controllers_1.deleteAllWeatherReports);
exports.default = router;
