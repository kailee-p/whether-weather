"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe('App', () => {
    let weatherData;
    let errorMessage;
    beforeEach(() => {
        weatherData = {
            city: '',
            country: '',
            actualTemp: 0,
            feelsLikeTemp: 0,
            weatherTitle: '',
            weatherDesc: '',
            timestamp: '',
        };
        errorMessage = '';
    });
    describe('default weatherData state', () => {
        it('should have a default weatherData state of empty strings and 0s', () => {
            expect(weatherData).toEqual({
                city: '',
                country: '',
                actualTemp: 0,
                feelsLikeTemp: 0,
                weatherTitle: '',
                weatherDesc: '',
                timestamp: '',
            });
        });
    });
    describe('default errorMessage state', () => {
        it('should have a default errorMessage state of empty string', () => {
            expect(errorMessage).toBe('');
        });
    });
});
