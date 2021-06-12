var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var fetch = require('node-fetch');
var tuc = require('temp-units-conv');
import WeatherReport from '../models/weather-report';
//gets location from user input using wit.ai NLP
export var getLocationFromUserInput = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var question, uri, auth;
    return __generator(this, function (_a) {
        console.log('processUserInput middleware called');
        question = req.body.message;
        uri = 'https://api.wit.ai/message?v=20200513&q=' + question;
        auth = 'Bearer ' + process.env.SERVER_TOKEN;
        fetch(uri, { headers: { Authorization: auth } })
            .then(function (res) { return res.json(); })
            .then(function (witData) {
            var locationArr = witData.entities['wit$location:location'];
            if (!locationArr) {
                res.json('I wasn\'t able to detect any cities in your question. Please ask me something else.');
                return next('ERROR: no cities');
            }
            else if (locationArr.length > 1) {
                res.json('Your question has too many cities for me to look up! Please ask about one city only.');
                return next('ERROR: too many cities');
            }
            res.locals.location = locationArr[0].body;
            return next();
        })
            .catch(function (err) { return console.log('ERR in getLocationFromUserInput: ', err); });
        return [2 /*return*/];
    });
}); };
//calls weather API to retrieve weather report based on user input
export var getWeatherReport = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var location, locationQuery;
    return __generator(this, function (_a) {
        console.log('getWeatherReport middleware called');
        location = res.locals.location;
        locationQuery = "\n  query { getCityByName(name: \"" + location + "\") {\n      name\n      country\n      weather {\n        summary {\n          title\n          description\n        }\n        temperature {\n          actual\n          feelsLike\n        }\n        timestamp\n      }\n    }\n  }";
        //queries GraphQL API for weather information based on user location input
        fetch('https://graphql-weather-api.herokuapp.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: locationQuery,
            }),
        })
            .then(function (res) { return res.json(); })
            .then(function (res) { return res.data.getCityByName; })
            .then(function (weatherData) {
            //error for no weather data retrieval
            if (weatherData === null) {
                res.json('I wasn\'t able to find any weather data for you. Please try again.');
                return next('ERROR: no weather data');
            }
            //convert temperatures to Fahrenheit rounded to nearest integer
            var actualTempFahrenheit = Math.round(tuc.k2f(weatherData.weather.temperature.actual));
            var feelsLikeTempFahrenheit = Math.round(tuc.k2f(weatherData.weather.temperature.feelsLike));
            //convert time stamp to string
            var timestampString = (new Date(weatherData.weather.timestamp * 1000)).toString();
            //store data in res.locals to pass to next piece of middleware
            res.locals.weatherReport = {
                city: weatherData.name,
                country: weatherData.country,
                weatherTitle: weatherData.weather.summary.title,
                weatherDesc: weatherData.weather.summary.description,
                actualTemp: actualTempFahrenheit,
                feelsLikeTemp: feelsLikeTempFahrenheit,
                timestamp: timestampString,
            };
            return next();
        })
            .catch(function (err) { return console.log('Error fetching GraphQL query: ', err); });
        return [2 /*return*/];
    });
}); };
//saves new weather report from GraphQL weather API in database
export var saveWeatherReport = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, city, country, weatherTitle, weatherDesc, actualTemp, feelsLikeTemp, timestamp;
    return __generator(this, function (_b) {
        console.log('saveWeatherReport middleware called');
        _a = res.locals.weatherReport, city = _a.city, country = _a.country, weatherTitle = _a.weatherTitle, weatherDesc = _a.weatherDesc, actualTemp = _a.actualTemp, feelsLikeTemp = _a.feelsLikeTemp, timestamp = _a.timestamp;
        WeatherReport.create({
            city: city,
            country: country,
            weatherTitle: weatherTitle,
            weatherDesc: weatherDesc,
            actualTemp: actualTemp,
            feelsLikeTemp: feelsLikeTemp,
            timestamp: timestamp
        })
            .then(function () {
            return res.status(200).json(res.locals.weatherReport);
        })
            .catch(function (err) { return console.log('ERR in saveWeatherReport: ', err); });
        return [2 /*return*/];
    });
}); };
//retrieves last 10 or fewer weather reports to display
export var getLastTenWeatherReports = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('getLastTenWeatherReports middleware called');
        WeatherReport.find({}, { _id: 0, __v: 0, weatherDesc: 0, feelsLikeTemp: 0 })
            .sort({ '_id': -1 })
            .limit(10)
            .exec()
            .then(function (lastTenReports) { return res.status(200).json(lastTenReports); })
            .catch(function (err) { return console.log('ERR in getLastTenWeatherReports: ', err); });
        return [2 /*return*/];
    });
}); };
//clears all weather reports from database
export var deleteAllWeatherReports = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('deleteAllWeatherReports middleware called');
        WeatherReport.collection
            .drop()
            .then(function () { return res.status(200).send('You successfully deleted all the weather reports.'); })
            .catch(function (err) { return console.log('ERR in deleteAllWeatherReports: ', err); });
        return [2 /*return*/];
    });
}); };
