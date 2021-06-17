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
require("../css/weather-form.css");
const WeatherForm = (props) => {
    const [message, setMessage] = react_1.useState("");
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (message === '') { //error for empty message
            props.setErrorMessage((prevState) => 'ERROR: Please enter a question.');
        }
        else { //message contains text, attempt to obtain location
            fetch('/weather-report', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                }),
            })
                .then((res) => res.json())
                .then((weatherData) => {
                //check if weatherData has data or is an error 
                if (weatherData.city !== undefined) {
                    props.setWeatherData((prevState) => ({
                        city: weatherData.city,
                        country: weatherData.country,
                        actualTemp: weatherData.actualTemp,
                        feelsLikeTemp: weatherData.feelsLikeTemp,
                        weatherTitle: weatherData.weatherTitle,
                        weatherDesc: weatherData.weatherDesc,
                        timestamp: weatherData.timestamp,
                    }), [props.setWeatherData]);
                    //set fetched to true so weather report will render
                    props.setWeatherDataFetched(true);
                }
                else { //returns an error
                    if (weatherData === 'ERROR: NO CITIES') {
                        props.setErrorMessage((prevState) => 'ERROR: Not able to find any cities in your query. Please try again.');
                    }
                    else if (weatherData === 'ERROR: TOO MANY CITIES') {
                        props.setErrorMessage((prevState) => 'ERROR: There are too many cities in your question. Please try again.');
                    }
                    else if (weatherData === 'ERROR: NO WEATHER DATA') {
                        props.setErrorMessage((prevState) => 'ERROR: Was not able to retrieve weather data. Please try again.');
                    }
                    else {
                        props.setErrorMessage((prevState) => 'ERROR: An unknown error occurred. Please try again.');
                    }
                }
            })
                .catch((err) => console.log('Error in POST request for weather report ', err));
        }
    };
    return (react_1.default.createElement("form", { id: "weather-form", onSubmit: handleSubmit },
        react_1.default.createElement("label", null,
            react_1.default.createElement("input", { id: "weather-message-input", type: "text", value: message, onChange: e => setMessage(e.target.value) })),
        react_1.default.createElement("input", { id: "weather-message-submit-button", type: "submit", value: "Submit" })));
};
exports.default = WeatherForm;
