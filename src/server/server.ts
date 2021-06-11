import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import weatherRoutes from './routes/api';
import { Server } from 'http';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

const PORT: number = 3000;

app.use(express.static('dist'));
app.use(cors());
app.use(weatherRoutes);


const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@whether-weather-cluster.guyni.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

console.log('URI', uri);

const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false);

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((err) => console.log('Unable to connect to MongoDB: ', err));