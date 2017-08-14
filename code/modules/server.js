const express = require('express');
const app = express();
const helmet = require('helmet');
const router = require(`${__dirname}/router`);
const middleware = require(`${__dirname}/middleware`);
const morgan = require(`${__dirname}/../middlewares/morgan`);
const bodyParser = require('body-parser');

app.use(helmet());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

middleware(app); //Load all the middlewares

morgan(app);//add morgan for automatic log of HTTP errors

app.use(router);

module.exports = app;
