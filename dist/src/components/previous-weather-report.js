"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const PreviousWeatherReport = (props) => {
    return (react_1.default.createElement("div", null,
        props.timestamp,
        react_1.default.createElement("br", null),
        props.city,
        ", ",
        props.country,
        react_1.default.createElement("br", null),
        props.weatherTitle,
        " (",
        props.actualTemp,
        "\u00B0 F)",
        react_1.default.createElement("br", null)));
};
exports.default = PreviousWeatherReport;
