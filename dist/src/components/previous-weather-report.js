"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const i18n_iso_countries_1 = __importDefault(require("i18n-iso-countries"));
const PreviousWeatherReport = (props) => {
    const country = i18n_iso_countries_1.default.getName(props.country, 'en', { select: 'official' });
    return (react_1.default.createElement("div", null,
        props.timestamp,
        react_1.default.createElement("br", null),
        props.city,
        ", ",
        country,
        react_1.default.createElement("br", null),
        props.weatherTitle,
        " (",
        props.actualTemp,
        "\u00B0 F)",
        react_1.default.createElement("br", null)));
};
exports.default = PreviousWeatherReport;
