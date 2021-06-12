import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import weatherRoutes from './routes/api';
import dotenv from 'dotenv';
dotenv.config();
var app = express();
var PORT = 3000;
app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(weatherRoutes);
//requests to an unknown route catch-all
app.get('*', function (req, res) {
    return res.status(404).send('Page not found');
});
var uri = "mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@whether-weather-cluster.guyni.mongodb.net/" + process.env.MONGO_DB + "?retryWrites=true&w=majority";
var options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);
mongoose
    .connect(uri, options)
    .then(function () {
    return app.listen(PORT, function () {
        return console.log("Server running on http://localhost:" + PORT);
    });
})
    .catch(function (err) { return console.log('Unable to connect to MongoDB: ', err); });
