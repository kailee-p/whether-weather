"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function WeatherSidebar() {
    return (react_1.default.createElement("div", { id: "weather-sidebar" },
        react_1.default.createElement("p", null, "This is your weather sidebar!")));
}
exports.default = WeatherSidebar;
