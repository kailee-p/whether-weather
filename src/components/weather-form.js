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
function WeatherForm() {
    const [message, setMessage] = react_1.useState("");
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log('message', message);
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
            .then((res) => console.log('POST request response', res))
            .catch((err) => console.log('Error in POST request for weather report ', err));
    };
    return (react_1.default.createElement("form", { onSubmit: handleSubmit },
        react_1.default.createElement("label", null,
            react_1.default.createElement("input", { id: "message-input", type: "text", value: message, onChange: e => setMessage(e.target.value) })),
        react_1.default.createElement("input", { id: "message-submit-button", type: "submit", value: "submit" })));
}
exports.default = WeatherForm;
