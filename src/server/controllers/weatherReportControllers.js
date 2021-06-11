"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllWeatherReports = exports.getAllWeatherReports = exports.saveWeatherReport = exports.getWeatherReport = void 0;
//calls API to retrieve weather report based on user input
const getWeatherReport = async (req, res, next) => {
    try {
        console.log('getWeatherReport middleware called');
        return next();
    }
    catch (err) {
    }
};
exports.getWeatherReport = getWeatherReport;
//saves new weather report from API in database
const saveWeatherReport = async (req, res, next) => {
    try {
        console.log('saveWeatherReport middleware called');
        return next();
    }
    catch (err) {
    }
};
exports.saveWeatherReport = saveWeatherReport;
//retrieves all weather reports from database for display
const getAllWeatherReports = async (req, res, next) => {
    try {
        console.log('getAllWeatherReports middleware called');
        return next();
    }
    catch (err) {
    }
};
exports.getAllWeatherReports = getAllWeatherReports;
//clears all weather reports from database
const deleteAllWeatherReports = async (req, res, next) => {
    try {
        console.log('deleteAllWeatherReports middleware called');
        return next();
    }
    catch (err) {
    }
};
exports.deleteAllWeatherReports = deleteAllWeatherReports;
