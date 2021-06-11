"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const weatherReportController = {};
//calls API to retrieve weather report based on user input
weatherReportController.getWeatherReport = async (req, res, next) => {
    try {
        console.log('getWeatherReport middleware called');
        return next();
    }
    catch (err) {
    }
};
//saves new weather report from API in database
weatherReportController.saveWeatherReport = async (req, res, next) => {
    try {
        console.log('saveWeatherReport middleware called');
        return next();
    }
    catch (err) {
    }
};
//retrieves all weather reports from database for display
weatherReportController.getAllWeatherReports = async (req, res, next) => {
    try {
        console.log('getAllWeatherReports middleware called');
        return next();
    }
    catch (err) {
    }
};
//clears all weather reports from database
weatherReportController.deleteAllWeatherReports = async (req, res, next) => {
    try {
        console.log('deleteAllWeatherReports middleware called');
        return next();
    }
    catch (err) {
    }
};
