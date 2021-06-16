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
const react_router_dom_1 = require("react-router-dom");
const weather_intro_1 = __importDefault(require("./components/weather-intro"));
const weather_form_1 = __importDefault(require("./components/weather-form"));
const weather_report_container_1 = __importDefault(require("./containers/weather-report-container"));
const App = () => {
    const [weatherData, setWeatherData] = react_1.useState({
        city: '',
        country: '',
        actualTemp: 0,
        feelsLikeTemp: 0,
        weatherTitle: '',
        weatherDesc: '',
        timestamp: '',
    });
    const [weatherDataFetched, setWeatherDataFetched] = react_1.useState(false);
    if (weatherDataFetched === true) {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(react_router_dom_1.Route, { path: '/weather-report-display' },
                react_1.default.createElement(weather_report_container_1.default, { weatherData: weatherData })),
            react_1.default.createElement(react_router_dom_1.Redirect, { to: { pathname: '/weather-report-display' } })));
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(weather_intro_1.default, null),
        react_1.default.createElement(weather_form_1.default, { setWeatherData: setWeatherData, setWeatherDataFetched: setWeatherDataFetched })));
};
exports.default = App;
