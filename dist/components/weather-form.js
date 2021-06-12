import React, { useState } from 'react';
function WeatherForm() {
    var _a = useState(""), message = _a[0], setMessage = _a[1];
    var handleSubmit = function (evt) {
        evt.preventDefault();
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
            .then(function (res) { return res.json(); })
            .then(function (res) { return console.log('response from Kailees server', res); })
            .catch(function (err) { return console.log('Error in POST request for weather report ', err); });
    };
    return (React.createElement("form", { id: "weather-form", onSubmit: handleSubmit },
        React.createElement("label", null,
            React.createElement("input", { id: "weather-message-input", type: "text", value: message, onChange: function (e) { return setMessage(e.target.value); } })),
        React.createElement("input", { id: "weather-message-submit-button", type: "submit", value: "submit" })));
}
export default WeatherForm;
