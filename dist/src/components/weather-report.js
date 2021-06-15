"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const WeatherReport = (props) => {
    return (react_1.default.createElement("div", { id: "weather-report" },
        react_1.default.createElement("p", null,
            "Weather as of ",
            props.weatherData.timestamp),
        react_1.default.createElement("p", null,
            "City: ",
            props.weatherData.city),
        react_1.default.createElement("p", null,
            "Country: ",
            props.weatherData.country),
        react_1.default.createElement("p", null,
            "ActualTemp: ",
            props.weatherData.actualTemp),
        react_1.default.createElement("p", null,
            "feelsLikeTemp: ",
            props.weatherData.feelsLikeTemp),
        react_1.default.createElement("p", null,
            props.weatherData.weatherTitle,
            ": ",
            props.weatherData.weatherDesc)));
};
exports.default = WeatherReport;
