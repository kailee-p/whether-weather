"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function WeatherReport() {
    return (react_1.default.createElement("div", { id: "weather-report" },
        react_1.default.createElement("p", null, "This is your weather report!")));
}
exports.default = WeatherReport;
