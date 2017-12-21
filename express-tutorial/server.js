const express = require('express');
const app = express();
const path = require('path');
const myData = require('./myData.json');

app.use(express.static(path.join(__dirname, 'public')));

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
};

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

app.use(urlLogger, timeLogger);

app.get('/json', (request, response) => {
  response.status(200).json(myData);
});

app.listen(3000, () => {
  console.log('express intro running on port 3000');
});

// further challenges 2

app.get('/sunsets', (request, response) => {
  response.sendFile(__dirname + '/public/sunsets.html');
});

// further challenges 3

// Created json file in directory and required on line 4

// further challenges 4

app.use((req, res, next) => {
  res.status(404).send("The resource you requested does not exist")
});


