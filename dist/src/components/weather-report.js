"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../css/weather-report.css");
const WeatherReport = (props) => {
    return (react_1.default.createElement("div", { id: "weather-report" },
        react_1.default.createElement("h2", null, "Your Weather Report"),
        react_1.default.createElement("p", null,
            "Weather as of ",
            react_1.default.createElement("strong", null, props.weatherData.timestamp)),
        react_1.default.createElement("p", null,
            react_1.default.createElement("strong", null, "City:"),
            " ",
            props.weatherData.city),
        react_1.default.createElement("p", null,
            react_1.default.createElement("strong", null, "Country:"),
            " ",
            props.weatherData.country),
        react_1.default.createElement("p", null,
            react_1.default.createElement("strong", null, "Temperature:"),
            " ",
            props.weatherData.actualTemp,
            "\u00B0 F (feels like ",
            props.weatherData.feelsLikeTemp,
            "\u00B0 F)"),
        react_1.default.createElement("p", null,
            react_1.default.createElement("strong", null,
                props.weatherData.weatherTitle,
                ":"),
            " ",
            props.weatherData.weatherDesc)));
};
exports.default = WeatherReport;
