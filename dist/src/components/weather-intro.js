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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
function WeatherIntro() {
    const introTextArr = [
        'Hi, I\'m WhetherWeather!',
        'My creator programmed me to get the weather for you!',
        'But unfortunately, she did not program me to understand other inquiries. :(',
        'Please ask me about the weather! :)'
    ];
    const [introText, setIntroText] = react_1.useState(0);
    setInterval(() => setIntroText);
    return (react_1.default.createElement("div", { id: "weather-intro" },
        react_1.default.createElement("h1", null, introTextArr[introText])));
}
exports.default = WeatherIntro;
