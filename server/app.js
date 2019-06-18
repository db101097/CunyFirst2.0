'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const routes = require('./routes');
//require('./routes/schedule')(app)

const models = require('./models/index');

// Taken from StackOverflow https://stackoverflow.com/a/12008719
app.use(function (req, res, next) {

   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);

   // Pass to next layer of middleware
   next();
})

const Sequelize = require('./sequelize')
//const models = require("./models/index")


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
//const waitListRoutes = require('./routes/waitList')(models['waitList'],models['classAvailability'],models['Class'],models['student'],app)
const searchRoutes = require('./routes/search')(app,models['Class'],models['meetInfo'],models['schedule'],models['student'])

// app.use('/api/student',student)
require('./routes/student')(app, models['student'])

module.exports = app;
