"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const previous_weather_report_1 = __importDefault(require("./previous-weather-report"));
require("../css/weather-sidebar.css");
const WeatherSidebar = () => {
    const [lastTenWeatherReports, setLastTenWeatherReports] = react_1.useState([]);
    react_1.useEffect(() => {
        fetch('/weather-report/previous-weather-reports', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((reports) => {
            setLastTenWeatherReports(reports);
        })
            .catch((err) => console.log('Error in GET request for weather logs: ', err));
    }, []);
    const handleClick = (evt) => {
        evt.preventDefault();
        fetch('/weather-report/delete-all', {
            method: 'DELETE',
        })
            .then((res) => {
            console.log('Response to DELETE request: ', res);
            setLastTenWeatherReports([]);
        })
            .catch((err) => console.log('Error in DELETE request ', err));
    };
    const prevWeatherReports = [];
    if (lastTenWeatherReports.length === 0) {
        return (react_1.default.createElement("div", { className: "weather-sidebar", id: "no-weather-reports" },
            react_1.default.createElement("h3", null, "Recent Weather Reports"),
            "There are no previous weather reports in my database!"));
    }
    else {
        for (let i = 0; i < lastTenWeatherReports.length; i++) {
            prevWeatherReports.push(react_1.default.createElement(previous_weather_report_1.default, { city: lastTenWeatherReports[i].city, country: lastTenWeatherReports[i].country, actualTemp: lastTenWeatherReports[i].actualTemp, weatherTitle: lastTenWeatherReports[i].weatherTitle, timestamp: lastTenWeatherReports[i].timestamp, key: i.toString() }));
        }
        return (react_1.default.createElement("div", { className: "weather-sidebar" },
            react_1.default.createElement("h3", null, "Recent Weather Reports"),
            react_1.default.createElement("div", { id: "prev-weather-report-container" }, prevWeatherReports),
            react_1.default.createElement("button", { id: "delete-weather-reports-button", onClick: handleClick }, "Delete Weather Reports")));
    }
};
exports.default = WeatherSidebar;
