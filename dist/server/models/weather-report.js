import { model, Schema } from 'mongoose';
var weatherReportSchema = new Schema({
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
export default model('weatherreport', weatherReportSchema);
