'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const routes = require('./routes');
//require('./routes/schedule')(app)

const Sequelize = require('./sequelize')
const models = require("./models/index")

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
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

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const scheduleRoutes = require('./routes/schedule')(app,models['Class'],models['meetInfo'],models['schedule'],models['student'])
const waitListRoutes = require('./routes/waitList')(models['waitList'],models['classAvailability'],models['Class'],models['student'],app)
const searchRoutes = require('./routes/search')(app,models['Class'],models['meetInfo'],models['schedule'],models['student'])

require('./routes/student')(app, models['student'])

module.exports = app;
