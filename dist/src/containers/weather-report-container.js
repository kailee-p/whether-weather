"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const video_background_1 = __importDefault(require("../components/video-background"));
const weather_report_1 = __importDefault(require("../components/weather-report"));
const weather_sidebar_1 = __importDefault(require("../components/weather-sidebar"));
require("../css/weather-report-container.css");
const WeatherReportContainer = (props) => {
    return (react_1.default.createElement("div", { id: "weather-report-container" },
        react_1.default.createElement(video_background_1.default, null),
        react_1.default.createElement(weather_report_1.default, { weatherData: props.weatherData }),
        react_1.default.createElement(weather_sidebar_1.default, null)));
};
exports.default = WeatherReportContainer;
