"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const weatherReportSchema = new mongoose_1.Schema({
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    weatherTitle: {
        type: String,
        required: true
    },
    weatherDesc: {
        type: String,
        required: true
    },
    actualTemp: {
        type: Number,
        required: true
    },
    feelsLikeTemp: {
        type: Number,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.model('weatherreport', weatherReportSchema);
