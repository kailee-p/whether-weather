"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const weather_form_1 = __importDefault(require("./components/weather-form"));
// import WeatherReportContainer from './containers/weather-report-container';
function App() {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(weather_form_1.default, null)));
}
exports.default = App;
