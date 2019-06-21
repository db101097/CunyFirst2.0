'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Sequelize = require('./sequelize')
const models = require("./models/index")

app.use(function(req, res, next) {
  const env = process.env.ENV
  let host = ""
  if(env === "dev")
    host = "http://localhost:3000"
  else if(env === "prod")
    host = "https://cunysecond.pillows.dev"
  else
    host = "http://localhost:3000"
  res.header('Access-Control-Allow-Origin', host);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json({limit:'100mb'}));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
  limit:'100mb'
}));

const scheduleRoutes = require('./routes/schedule')(app,models['Class'],models['meetInfo'],models['schedule'],models['student'],models['classAvailability'],models['classDetail'])
const waitListRoutes = require('./routes/waitList')(models['waitList'],models['classAvailability'],models['Class'],models['student'],app)
const searchRoutes = require('./routes/search')(app,models['Class'],models['meetInfo'],models['schedule'],models['student'],models['classDetail'],models['classAvailability'])
require('./routes/exportpdf')(app)
require('./routes/student')(app, models['student'])

module.exports = app;
