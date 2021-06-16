import express, { Express, Response, Request } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import weatherRoutes from './routes/api';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

const PORT: number = 3000;

app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(weatherRoutes);

//requests to an unknown route catch-all
app.get('*',
  (req: Request, res: Response) => {
    return res.status(404).send('ERROR 404: Page not found');
  }
);

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@whether-weather-cluster.guyni.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

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