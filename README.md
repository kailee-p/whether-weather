# Whether Weather

A full stack application that uses limited NLP to process queries about the weather.

## Description

Whether Weather is an app with a React/Typescript frontend and a Node/Express backend that utilizes the Wit.ai NLP interface to analyze user queries for locations, and then queries a GraphQL weather API to retrieve weather data. 

## Getting Started

To run this project locally, create an account with [Wit.ai](https://wit.ai/) and obtain a client access token. Create a .env file in the root folder and add REACT_APP_CLIENT_TOKEN=YOUR-TOKEN-HERE.

Create a MongoDB database using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and add MONGO_USER=YOUR-USERNAME-HERE, MONGO_PASSWORD=YOUR-MONGO-PASSWORD-HERE, and MONGO_DB=YOUR-DB-NAME-HERE to the .env file.

```
npm install
npm run dev
```

Your server will start on localhost:3000 and your frontend will be at localhost:9000. 

## Authors

Kailee Pedersen - https://github.com/kailee-p

## Resources

Special thanks to the following resources.

[@konstantinmuenster - GraphQL WeatherAPI](https://github.com/konstantinmuenster/graphql-weather-api)

[Use TypeScript to Build a Node API with Express](https://developer.okta.com/blog/2018/11/15/node-express-typescript)

[How to Build a Todo App with React, TypeScript, NodeJS, and MongoDB](https://www.freecodecamp.org/news/how-to-build-a-todo-app-with-react-typescript-nodejs-and-mongodb/#api-with-nodejs-express-mongodb-and-typescript)

[How to set up an Express.js API using Webpack and TypeScript](https://medium.com/the-andela-way/how-to-set-up-an-express-api-using-webpack-and-typescript-69d18c8c4f52)

[Sunray Clouds 4K Living Background - Videezy](https://www.videezy.com/backgrounds/4956-sunray-clouds-4k-living-background)